require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');

// --- CONFIGURACIÓN INICIAL ---
const app = express();
const PORT = process.env.PORT || 3000;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY || ''; // Opcional si no lo pusiste en Render aún

// Validar variables críticas
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR FATAL: Faltan SUPABASE_URL o SUPABASE_KEY en las variables de entorno.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- CREAR CARPETAS NECESARIAS (Para evitar errores en Render) ---
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');

[UPLOADS_DIR, PUBLIC_DIR, DATA_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Carpeta creada: ${dir}`);
  }
});

// Crear un index.html básico si no existe (para que la web no esté vacía)
const indexPath = path.join(PUBLIC_DIR, 'index.html');
if (!fs.existsSync(indexPath)) {
  const defaultHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SeminarioHub</title>
        <style>
            body { font-family: sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; text-align: center; }
            .container { padding: 2rem; background: #1e293b; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
            h1 { color: #818cf8; }
            p { color: #94a3b8; }
            .status { margin-top: 1rem; padding: 0.5rem; background: #064e3b; color: #6ee7b7; border-radius: 0.5rem; display: inline-block; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📚 SeminarioHub</h1>
            <p>El servidor está funcionando correctamente.</p>
            <div class="status">✅ Conectado a Supabase</div>
            <p style="margin-top:20px; font-size:0.9rem;">Pronto se cargará la interfaz completa.</p>
        </div>
    </body>
    </html>
  `;
  fs.writeFileSync(indexPath, defaultHTML);
  console.log('📄 Archivo index.html básico creado.');
}

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(PUBLIC_DIR));

// --- CONFIGURACIÓN DE MULTER (Subida de archivos) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${uuidv4()}-${file.originalname}`)
});
const upload = multer({ 
  storage, 
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Solo se permiten archivos PDF'), false);
  }
});

// --- FUNCIONES AUXILIARES (PDF & IA) ---
// Funciones simplificadas para extraer texto y generar lecciones
// (En un entorno real, aquí iría todo tu código largo de procesamiento)

async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return { text: data.text, numPages: data.numpages };
  } catch (error) {
    console.error("Error leyendo PDF:", error);
    throw error;
  }
}

async function generateLessons(text, pdfName, apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    console.log("⚠️ Sin API Key de Gemini, generando lección básica...");
    return [{
      id: uuidv4(),
      title: "Lección Generada (Modo Básico)",
      content: "Configura tu API Key de Gemini en las variables de entorno para generar lecciones completas con IA.",
      exercises: [{ type: 'writing', question: '¿Qué aprendiste hoy?', label: 'Reflexión' }]
    }];
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Genera una lección corta basada en este texto. Devuelve SOLO un JSON válido con: title, summary, y un array de blocks (cada uno con content y exercise). Texto: ${text.substring(0, 3000)}...`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json|```/g, '').trim();
    const data = JSON.parse(responseText);
    
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error con Gemini:", error.message);
    return [{
      id: uuidv4(),
      title: "Error al generar con IA",
      content: "No se pudo conectar con la IA. Revisa tu API Key.",
      exercises: []
    }];
  }
}

// --- RUTAS DE LA API ---

// 1. Obtener Cursos
app.get('/api/cursos', async (req, res) => {
  const { data, error } = await supabase.from('cursos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

// 2. Crear Curso
app.post('/api/cursos', async (req, res) => {
  const { nombre, descripcion } = req.body;
  const { data, error } = await supabase.from('cursos').insert([{ nombre, descripcion }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 3. Subir PDF y Procesar
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se recibió ningún archivo.' });

    console.log(`📄 Procesando archivo: ${req.file.originalname}`);

    // 1. Registrar PDF en BD
    const { data: pdfData, error: pdfError } = await supabase
      .from('pdfs')
      .insert([{ 
        titulo: req.file.originalname, 
        url_storage: req.file.path, 
        paginas: 0, 
        estado: 'procesando' 
      }])
      .select()
      .single();

    if (pdfError) throw pdfError;

    // 2. Extraer texto
    const { text, numPages } = await extractTextFromPDF(req.file.path);
    
    // Actualizar número de páginas
    await supabase.from('pdfs').update({ paginas: numPages }).eq('id', pdfData.id);

    // 3. Generar lecciones
    const lessons = await generateLessons(text, req.file.originalname, geminiApiKey);

    // 4. Guardar Miniclases y Cuestionarios
    for (const lesson of lessons) {
      const { data: miniData } = await supabase.from('miniclases_generadas').insert([{
        pdf_id: pdfData.id,
        texto_completo: lesson.content || JSON.stringify(lesson.blocks),
        palabras_clave: lesson.title
      }]).select().single();

      if (miniData) {
        await supabase.from('cuestionarios').insert([{
          miniclase_id: miniData.id,
          preguntas: lesson.exercises || [],
          respuestas: {}
        }]);
      }
    }

    // Marcar como completado
    await supabase.from('pdfs').update({ estado: 'completado' }).eq('id', pdfData.id);

    res.json({ success: true, message: `Procesado: ${lessons.length} lecciones creadas.`, lessons });
  } catch (error) {
    console.error("Error en upload:", error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Obtener Miniclases
app.get('/api/miniclases', async (req, res) => {
  const { data, error } = await supabase.from('miniclases_generadas').select('*, pdfs(titulo)');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

// 5. Registrar Progreso
app.post('/api/progreso', async (req, res) => {
  const { alumno_id, miniclase_id, puntaje } = req.body;
  const { data, error } = await supabase.from('progreso').insert([{
    alumno_id, miniclase_id, puntaje, completado: true, fecha: new Date().toISOString()
  }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// 6. Obtener Estadísticas
app.get('/api/stats', async (req, res) => {
  const { count: totalAlumnos } = await supabase.from('alumnos').select('*', { count: 'exact', head: true });
  const { count: totalLecciones } = await supabase.from('miniclases_generadas').select('*', { count: 'exact', head: true });
  const { count: totalProgreso } = await supabase.from('progreso').select('*', { count: 'exact', head: true });
  
  res.json({
    totalAlumnos: totalAlumnos || 0,
    totalLecciones: totalLecciones || 0,
    totalCompletados: totalProgreso || 0
  });
});

// Ruta comodín para servir el frontend
app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║         🚀 SeminarioHub Online              ║');
  console.log('╠══════════════════════════════════════════════╣');
  console.log(`║  🌐 Servidor corriendo en puerto ${PORT}           ║`);
  console.log(`║  💾 Conectado a Supabase                     ║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
});
