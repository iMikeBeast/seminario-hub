{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 .AppleSystemUIFontMonospaced-Regular;}
{\colortbl;\red255\green255\blue255;\red244\green246\blue249;\red27\green31\blue34;\red212\green212\blue212;
\red136\green185\blue102;\red184\green93\blue213;\red54\green192\blue160;\red79\green123\blue61;\red167\green197\blue152;
}
{\*\expandedcolortbl;;\cssrgb\c96471\c97255\c98039;\cssrgb\c14118\c16078\c18039;\cssrgb\c86275\c86275\c86275;
\cssrgb\c59608\c76471\c47451;\cssrgb\c77647\c47059\c86667;\cssrgb\c23922\c78824\c69020;\cssrgb\c37647\c54510\c30588;\cssrgb\c70980\c80784\c65882;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 require\cf4 \strokec4 (\cf5 \strokec5 'dotenv'\cf4 \strokec4 ).\cf2 \strokec2 config\cf4 \strokec4 ();\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf2 \strokec2  express \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 'express'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  multer \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 'multer'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  cors \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 'cors'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  path \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 'path'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  fs \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 'fs'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  v4\cf4 \strokec4 :\cf2 \strokec2  uuidv4 \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 'uuid'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  createClient \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 '@supabase/supabase-js'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  \cf7 \strokec7 GoogleGenerativeAI\cf2 \strokec2  \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 '@google/generative-ai'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  pdf \cf4 \strokec4 =\cf2 \strokec2  require\cf4 \strokec4 (\cf5 \strokec5 'pdf-parse'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // --- CONFIGURACI\'d3N ---\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf2 \strokec2  app \cf4 \strokec4 =\cf2 \strokec2  express\cf4 \strokec4 ();\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  \cf7 \strokec7 PORT\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  process\cf4 \strokec4 .\cf2 \strokec2 env\cf4 \strokec4 .\cf7 \strokec7 PORT\cf2 \strokec2  \cf4 \strokec4 ||\cf2 \strokec2  \cf9 \strokec9 3000\cf4 \strokec4 ;\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  supabaseUrl \cf4 \strokec4 =\cf2 \strokec2  process\cf4 \strokec4 .\cf2 \strokec2 env\cf4 \strokec4 .\cf7 \strokec7 SUPABASE_URL\cf4 \strokec4 ;\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 const\cf2 \strokec2  supabaseKey \cf4 \strokec4 =\cf2 \strokec2  process\cf4 \strokec4 .\cf2 \strokec2 env\cf4 \strokec4 .\cf7 \strokec7 SUPABASE_KEY\cf4 \strokec4 ;\cf2 \cb1 \strokec2 \
\
\cf6 \cb3 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (!\cf2 \strokec2 supabaseUrl \cf4 \strokec4 ||\cf2 \strokec2  \cf4 \strokec4 !\cf2 \strokec2 supabaseKey\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3   console\cf4 \strokec4 .\cf2 \strokec2 error\cf4 \strokec4 (\cf5 \strokec5 '\uc0\u10060  Faltan variables de entorno SUPABASE_URL o SUPABASE_KEY'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cb3   process\cf4 \strokec4 .\cf2 \strokec2 exit\cf4 \strokec4 (\cf9 \strokec9 1\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \}\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf2 \strokec2  supabase \cf4 \strokec4 =\cf2 \strokec2  createClient\cf4 \strokec4 (\cf2 \strokec2 supabaseUrl\cf4 \strokec4 ,\cf2 \strokec2  supabaseKey\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // --- MIDDLEWARE ---\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 app\cf4 \strokec4 .\cf2 \strokec2 use\cf4 \strokec4 (\cf2 \strokec2 cors\cf4 \strokec4 ());\cf2 \cb1 \strokec2 \
\cb3 app\cf4 \strokec4 .\cf2 \strokec2 use\cf4 \strokec4 (\cf2 \strokec2 express\cf4 \strokec4 .\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  limit\cf4 \strokec4 :\cf2 \strokec2  \cf5 \strokec5 '50mb'\cf2 \strokec2  \cf4 \strokec4 \}));\cf2 \cb1 \strokec2 \
\cb3 app\cf4 \strokec4 .\cf2 \strokec2 use\cf4 \strokec4 (\cf2 \strokec2 express\cf4 \strokec4 .\cf2 \strokec2 urlencoded\cf4 \strokec4 (\{\cf2 \strokec2  extended\cf4 \strokec4 :\cf2 \strokec2  \cf6 \strokec6 true\cf4 \strokec4 ,\cf2 \strokec2  limit\cf4 \strokec4 :\cf2 \strokec2  \cf5 \strokec5 '50mb'\cf2 \strokec2  \cf4 \strokec4 \}));\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // --- STORAGE CONFIG (Memoria temporal para Render) ---\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf2 \strokec2  \cf7 \strokec7 UPLOADS_DIR\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  path\cf4 \strokec4 .\cf2 \strokec2 join\cf4 \strokec4 (\cf2 \strokec2 __dirname\cf4 \strokec4 ,\cf2 \strokec2  \cf5 \strokec5 'uploads'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (!\cf2 \strokec2 fs\cf4 \strokec4 .\cf2 \strokec2 existsSync\cf4 \strokec4 (\cf7 \strokec7 UPLOADS_DIR\cf4 \strokec4 ))\cf2 \strokec2  fs\cf4 \strokec4 .\cf2 \strokec2 mkdirSync\cf4 \strokec4 (\cf7 \strokec7 UPLOADS_DIR\cf4 \strokec4 ,\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  recursive\cf4 \strokec4 :\cf2 \strokec2  \cf6 \strokec6 true\cf2 \strokec2  \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\
\cf6 \cb3 \strokec6 const\cf2 \strokec2  storage \cf4 \strokec4 =\cf2 \strokec2  multer\cf4 \strokec4 .\cf2 \strokec2 diskStorage\cf4 \strokec4 (\{\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3   destination\cf4 \strokec4 :\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 ,\cf2 \strokec2  file\cf4 \strokec4 ,\cf2 \strokec2  cb\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  cb\cf4 \strokec4 (\cf6 \strokec6 null\cf4 \strokec4 ,\cf2 \strokec2  \cf7 \strokec7 UPLOADS_DIR\cf4 \strokec4 ),\cf2 \cb1 \strokec2 \
\cb3   filename\cf4 \strokec4 :\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 ,\cf2 \strokec2  file\cf4 \strokec4 ,\cf2 \strokec2  cb\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  cb\cf4 \strokec4 (\cf6 \strokec6 null\cf4 \strokec4 ,\cf2 \strokec2  \cf5 \strokec5 `\cf4 \strokec4 $\{\cf7 \strokec7 Date\cf4 \strokec4 .\cf2 \strokec2 now\cf4 \strokec4 ()\}\cf5 \strokec5 -\cf4 \strokec4 $\{\cf2 \strokec2 file\cf4 \strokec4 .\cf2 \strokec2 originalname\cf4 \strokec4 \}\cf5 \strokec5 `\cf4 \strokec4 )\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \});\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 const\cf2 \strokec2  upload \cf4 \strokec4 =\cf2 \strokec2  multer\cf4 \strokec4 (\{\cf2 \strokec2  storage\cf4 \strokec4 ,\cf2 \strokec2  limits\cf4 \strokec4 :\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  fileSize\cf4 \strokec4 :\cf2 \strokec2  \cf9 \strokec9 50\cf2 \strokec2  \cf4 \strokec4 *\cf2 \strokec2  \cf9 \strokec9 1024\cf2 \strokec2  \cf4 \strokec4 *\cf2 \strokec2  \cf9 \strokec9 1024\cf2 \strokec2  \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // --- FUNCIONES AUXILIARES (PDF y IA) ---\cf2 \cb1 \strokec2 \
\cf8 \cb3 \strokec8 // (Aqu\'ed ir\'edan las funciones fixEncoding, organizeParagraphs, generateLessons, etc. \cf2 \cb1 \strokec2 \
\cf8 \cb3 \strokec8 // que ya ten\'edas en tu c\'f3digo original. Por brevedad, asumo que las pegar\'e1s completas)\cf2 \cb1 \strokec2 \
\cf8 \cb3 \strokec8 // ... [PEGA AQU\'cd EL RESTO DE TUS FUNCIONES DE PROCESAMIENTO DE PDF Y GEMINI] ...\cf2 \cb1 \strokec2 \
\
\cf8 \cb3 \strokec8 // Simulaci\'f3n de funciones si no las pegas ahora (BORRAR ESTO CUANDO PEGUES TU C\'d3DIGO REAL)\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf6 \cb3 \strokec6 async\cf2 \strokec2  \cf6 \strokec6 function\cf2 \strokec2  extractTextFromPDF\cf4 \strokec4 (\cf2 \strokec2 filePath\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  \cf6 \strokec6 return\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  text\cf4 \strokec4 :\cf2 \strokec2  \cf5 \strokec5 "Texto de prueba"\cf4 \strokec4 ,\cf2 \strokec2  numPages\cf4 \strokec4 :\cf2 \strokec2  \cf9 \strokec9 1\cf2 \strokec2  \cf4 \strokec4 \};\cf2 \strokec2  \cf4 \strokec4 \}\cf2 \cb1 \strokec2 \
\cf6 \cb3 \strokec6 async\cf2 \strokec2  \cf6 \strokec6 function\cf2 \strokec2  generateLessons\cf4 \strokec4 (\cf2 \strokec2 text\cf4 \strokec4 ,\cf2 \strokec2  name\cf4 \strokec4 ,\cf2 \strokec2  key\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  \cf6 \strokec6 return\cf2 \strokec2  \cf4 \strokec4 [];\cf2 \strokec2  \cf4 \strokec4 \}\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // --- RUTAS API ---\cf2 \cb1 \strokec2 \
\
\cf8 \cb3 \strokec8 // 1. Obtener Cursos\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 app\cf4 \strokec4 .\cf6 \strokec6 get\cf4 \strokec4 (\cf5 \strokec5 '/api/cursos'\cf4 \strokec4 ,\cf2 \strokec2  \cf6 \strokec6 async\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 ,\cf2 \strokec2  res\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  data\cf4 \strokec4 ,\cf2 \strokec2  error \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf6 \strokec6 await\cf2 \strokec2  supabase\cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'cursos'\cf4 \strokec4 ).\cf2 \strokec2 select\cf4 \strokec4 (\cf5 \strokec5 '*'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 error\cf4 \strokec4 )\cf2 \strokec2  \cf6 \strokec6 return\cf2 \strokec2  res\cf4 \strokec4 .\cf2 \strokec2 status\cf4 \strokec4 (\cf9 \strokec9 500\cf4 \strokec4 ).\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  error\cf4 \strokec4 :\cf2 \strokec2  error\cf4 \strokec4 .\cf2 \strokec2 message \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\cb3   res\cf4 \strokec4 .\cf2 \strokec2 json\cf4 \strokec4 (\cf2 \strokec2 data\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \});\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // 2. Crear Curso\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 app\cf4 \strokec4 .\cf2 \strokec2 post\cf4 \strokec4 (\cf5 \strokec5 '/api/cursos'\cf4 \strokec4 ,\cf2 \strokec2  \cf6 \strokec6 async\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 ,\cf2 \strokec2  res\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  nombre\cf4 \strokec4 ,\cf2 \strokec2  descripcion \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  req\cf4 \strokec4 .\cf2 \strokec2 body\cf4 \strokec4 ;\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  data\cf4 \strokec4 ,\cf2 \strokec2  error \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf6 \strokec6 await\cf2 \strokec2  supabase\cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'cursos'\cf4 \strokec4 ).\cf2 \strokec2 insert\cf4 \strokec4 ([\{\cf2 \strokec2  nombre\cf4 \strokec4 ,\cf2 \strokec2  descripcion \cf4 \strokec4 \}]).\cf2 \strokec2 select\cf4 \strokec4 ();\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 error\cf4 \strokec4 )\cf2 \strokec2  \cf6 \strokec6 return\cf2 \strokec2  res\cf4 \strokec4 .\cf2 \strokec2 status\cf4 \strokec4 (\cf9 \strokec9 500\cf4 \strokec4 ).\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  error\cf4 \strokec4 :\cf2 \strokec2  error\cf4 \strokec4 .\cf2 \strokec2 message \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\cb3   res\cf4 \strokec4 .\cf2 \strokec2 json\cf4 \strokec4 (\cf2 \strokec2 data\cf4 \strokec4 [\cf9 \strokec9 0\cf4 \strokec4 ]);\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \});\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // 3. Subir PDF y Generar Lecciones\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 app\cf4 \strokec4 .\cf2 \strokec2 post\cf4 \strokec4 (\cf5 \strokec5 '/api/upload'\cf4 \strokec4 ,\cf2 \strokec2  upload\cf4 \strokec4 .\cf2 \strokec2 single\cf4 \strokec4 (\cf5 \strokec5 'pdf'\cf4 \strokec4 ),\cf2 \strokec2  \cf6 \strokec6 async\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 ,\cf2 \strokec2  res\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 try\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3     \cf6 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (!\cf2 \strokec2 req\cf4 \strokec4 .\cf2 \strokec2 file\cf4 \strokec4 )\cf2 \strokec2  \cf6 \strokec6 return\cf2 \strokec2  res\cf4 \strokec4 .\cf2 \strokec2 status\cf4 \strokec4 (\cf9 \strokec9 400\cf4 \strokec4 ).\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  error\cf4 \strokec4 :\cf2 \strokec2  \cf5 \strokec5 'No file'\cf2 \strokec2  \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\cb3     \cb1 \
\cb3     \cf8 \strokec8 // 1. Guardar metadata del PDF en Supabase\cf2 \cb1 \strokec2 \
\cb3     \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  data\cf4 \strokec4 :\cf2 \strokec2  pdfData\cf4 \strokec4 ,\cf2 \strokec2  error\cf4 \strokec4 :\cf2 \strokec2  pdfError \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf6 \strokec6 await\cf2 \strokec2  supabase\cb1 \
\cb3       \cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'pdfs'\cf4 \strokec4 )\cf2 \cb1 \strokec2 \
\cb3       \cf4 \strokec4 .\cf2 \strokec2 insert\cf4 \strokec4 ([\{\cf2 \strokec2  \cb1 \
\cb3         titulo\cf4 \strokec4 :\cf2 \strokec2  req\cf4 \strokec4 .\cf2 \strokec2 file\cf4 \strokec4 .\cf2 \strokec2 originalname\cf4 \strokec4 ,\cf2 \strokec2  \cb1 \
\cb3         url_storage\cf4 \strokec4 :\cf2 \strokec2  req\cf4 \strokec4 .\cf2 \strokec2 file\cf4 \strokec4 .\cf2 \strokec2 path\cf4 \strokec4 ,\cf2 \strokec2  \cb1 \
\cb3         paginas\cf4 \strokec4 :\cf2 \strokec2  \cf9 \strokec9 0\cf4 \strokec4 ,\cf2 \strokec2  \cb1 \
\cb3         estado\cf4 \strokec4 :\cf2 \strokec2  \cf5 \strokec5 'procesando'\cf2 \strokec2  \cb1 \
\cb3       \cf4 \strokec4 \}])\cf2 \cb1 \strokec2 \
\cb3       \cf4 \strokec4 .\cf2 \strokec2 select\cf4 \strokec4 ()\cf2 \cb1 \strokec2 \
\cb3       \cf4 \strokec4 .\cf2 \strokec2 single\cf4 \strokec4 ();\cf2 \cb1 \strokec2 \
\
\cb3     \cf6 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 pdfError\cf4 \strokec4 )\cf2 \strokec2  \cf6 \strokec6 throw\cf2 \strokec2  pdfError\cf4 \strokec4 ;\cf2 \cb1 \strokec2 \
\
\cb3     \cf8 \strokec8 // 2. Extraer texto (Simulado aqu\'ed, usa tu funci\'f3n real)\cf2 \cb1 \strokec2 \
\cb3     \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  text\cf4 \strokec4 ,\cf2 \strokec2  numPages \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf6 \strokec6 await\cf2 \strokec2  extractTextFromPDF\cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 .\cf2 \strokec2 file\cf4 \strokec4 .\cf2 \strokec2 path\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cb3     \cb1 \
\cb3     \cf8 \strokec8 // Actualizar p\'e1ginas\cf2 \cb1 \strokec2 \
\cb3     \cf6 \strokec6 await\cf2 \strokec2  supabase\cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'pdfs'\cf4 \strokec4 ).\cf2 \strokec2 update\cf4 \strokec4 (\{\cf2 \strokec2  paginas\cf4 \strokec4 :\cf2 \strokec2  numPages \cf4 \strokec4 \}).\cf2 \strokec2 eq\cf4 \strokec4 (\cf5 \strokec5 'id'\cf4 \strokec4 ,\cf2 \strokec2  pdfData\cf4 \strokec4 .\cf2 \strokec2 id\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\
\cb3     \cf8 \strokec8 // 3. Generar lecciones con IA\cf2 \cb1 \strokec2 \
\cb3     \cf6 \strokec6 const\cf2 \strokec2  lessons \cf4 \strokec4 =\cf2 \strokec2  \cf6 \strokec6 await\cf2 \strokec2  generateLessons\cf4 \strokec4 (\cf2 \strokec2 text\cf4 \strokec4 ,\cf2 \strokec2  req\cf4 \strokec4 .\cf2 \strokec2 file\cf4 \strokec4 .\cf2 \strokec2 originalname\cf4 \strokec4 ,\cf2 \strokec2  process\cf4 \strokec4 .\cf2 \strokec2 env\cf4 \strokec4 .\cf7 \strokec7 GEMINI_API_KEY\cf2 \strokec2  \cf4 \strokec4 ||\cf2 \strokec2  \cf5 \strokec5 ''\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\
\cb3     \cf8 \strokec8 // 4. Guardar miniclases y cuestionarios\cf2 \cb1 \strokec2 \
\cb3     \cf6 \strokec6 for\cf2 \strokec2  \cf4 \strokec4 (\cf6 \strokec6 const\cf2 \strokec2  lesson \cf6 \strokec6 of\cf2 \strokec2  lessons\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3       \cf8 \strokec8 // Insertar Miniclase\cf2 \cb1 \strokec2 \
\cb3       \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  data\cf4 \strokec4 :\cf2 \strokec2  miniData \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf6 \strokec6 await\cf2 \strokec2  supabase\cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'miniclases_generadas'\cf4 \strokec4 ).\cf2 \strokec2 insert\cf4 \strokec4 ([\{\cf2 \cb1 \strokec2 \
\cb3         pdf_id\cf4 \strokec4 :\cf2 \strokec2  pdfData\cf4 \strokec4 .\cf2 \strokec2 id\cf4 \strokec4 ,\cf2 \cb1 \strokec2 \
\cb3         texto_completo\cf4 \strokec4 :\cf2 \strokec2  lesson\cf4 \strokec4 .\cf2 \strokec2 content \cf4 \strokec4 ||\cf2 \strokec2  \cf7 \strokec7 JSON\cf4 \strokec4 .\cf2 \strokec2 stringify\cf4 \strokec4 (\cf2 \strokec2 lesson\cf4 \strokec4 .\cf2 \strokec2 blocks\cf4 \strokec4 ),\cf2 \cb1 \strokec2 \
\cb3         palabras_clave\cf4 \strokec4 :\cf2 \strokec2  lesson\cf4 \strokec4 .\cf2 \strokec2 title\cb1 \
\cb3       \cf4 \strokec4 \}]).\cf2 \strokec2 select\cf4 \strokec4 ().\cf2 \strokec2 single\cf4 \strokec4 ();\cf2 \cb1 \strokec2 \
\
\cb3       \cf8 \strokec8 // Insertar Cuestionario\cf2 \cb1 \strokec2 \
\cb3       \cf6 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 miniData\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3         \cf6 \strokec6 await\cf2 \strokec2  supabase\cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'cuestionarios'\cf4 \strokec4 ).\cf2 \strokec2 insert\cf4 \strokec4 ([\{\cf2 \cb1 \strokec2 \
\cb3           miniclase_id\cf4 \strokec4 :\cf2 \strokec2  miniData\cf4 \strokec4 .\cf2 \strokec2 id\cf4 \strokec4 ,\cf2 \cb1 \strokec2 \
\cb3           preguntas\cf4 \strokec4 :\cf2 \strokec2  lesson\cf4 \strokec4 .\cf2 \strokec2 exercises \cf4 \strokec4 ||\cf2 \strokec2  \cf4 \strokec4 [],\cf2 \cb1 \strokec2 \
\cb3           respuestas\cf4 \strokec4 :\cf2 \strokec2  \cf4 \strokec4 \{\}\cf2 \strokec2  \cb1 \
\cb3         \cf4 \strokec4 \}]);\cf2 \cb1 \strokec2 \
\cb3       \cf4 \strokec4 \}\cf2 \cb1 \strokec2 \
\cb3     \cf4 \strokec4 \}\cf2 \cb1 \strokec2 \
\
\cb3     \cf8 \strokec8 // Actualizar estado\cf2 \cb1 \strokec2 \
\cb3     \cf6 \strokec6 await\cf2 \strokec2  supabase\cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'pdfs'\cf4 \strokec4 ).\cf2 \strokec2 update\cf4 \strokec4 (\{\cf2 \strokec2  estado\cf4 \strokec4 :\cf2 \strokec2  \cf5 \strokec5 'completado'\cf2 \strokec2  \cf4 \strokec4 \}).\cf2 \strokec2 eq\cf4 \strokec4 (\cf5 \strokec5 'id'\cf4 \strokec4 ,\cf2 \strokec2  pdfData\cf4 \strokec4 .\cf2 \strokec2 id\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\
\cb3     res\cf4 \strokec4 .\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  success\cf4 \strokec4 :\cf2 \strokec2  \cf6 \strokec6 true\cf4 \strokec4 ,\cf2 \strokec2  message\cf4 \strokec4 :\cf2 \strokec2  \cf5 \strokec5 'Proceso completado'\cf4 \strokec4 ,\cf2 \strokec2  lessons \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\cb3   \cf4 \strokec4 \}\cf2 \strokec2  \cf6 \strokec6 catch\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 error\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3     console\cf4 \strokec4 .\cf2 \strokec2 error\cf4 \strokec4 (\cf2 \strokec2 error\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cb3     res\cf4 \strokec4 .\cf2 \strokec2 status\cf4 \strokec4 (\cf9 \strokec9 500\cf4 \strokec4 ).\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  error\cf4 \strokec4 :\cf2 \strokec2  error\cf4 \strokec4 .\cf2 \strokec2 message \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\cb3   \cf4 \strokec4 \}\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \});\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // 4. Obtener Miniclases\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 app\cf4 \strokec4 .\cf6 \strokec6 get\cf4 \strokec4 (\cf5 \strokec5 '/api/miniclases'\cf4 \strokec4 ,\cf2 \strokec2  \cf6 \strokec6 async\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 ,\cf2 \strokec2  res\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  data\cf4 \strokec4 ,\cf2 \strokec2  error \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf6 \strokec6 await\cf2 \strokec2  supabase\cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'miniclases_generadas'\cf4 \strokec4 ).\cf2 \strokec2 select\cf4 \strokec4 (\cf5 \strokec5 '*, pdfs(titulo)'\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 error\cf4 \strokec4 )\cf2 \strokec2  \cf6 \strokec6 return\cf2 \strokec2  res\cf4 \strokec4 .\cf2 \strokec2 status\cf4 \strokec4 (\cf9 \strokec9 500\cf4 \strokec4 ).\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  error\cf4 \strokec4 :\cf2 \strokec2  error\cf4 \strokec4 .\cf2 \strokec2 message \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\cb3   res\cf4 \strokec4 .\cf2 \strokec2 json\cf4 \strokec4 (\cf2 \strokec2 data\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \});\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // 5. Registrar Progreso\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 app\cf4 \strokec4 .\cf2 \strokec2 post\cf4 \strokec4 (\cf5 \strokec5 '/api/progreso'\cf4 \strokec4 ,\cf2 \strokec2  \cf6 \strokec6 async\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 ,\cf2 \strokec2  res\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  alumno_id\cf4 \strokec4 ,\cf2 \strokec2  miniclase_id\cf4 \strokec4 ,\cf2 \strokec2  puntaje \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  req\cf4 \strokec4 .\cf2 \strokec2 body\cf4 \strokec4 ;\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 const\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \strokec2  data\cf4 \strokec4 ,\cf2 \strokec2  error \cf4 \strokec4 \}\cf2 \strokec2  \cf4 \strokec4 =\cf2 \strokec2  \cf6 \strokec6 await\cf2 \strokec2  supabase\cf4 \strokec4 .\cf6 \strokec6 from\cf4 \strokec4 (\cf5 \strokec5 'progreso'\cf4 \strokec4 ).\cf2 \strokec2 insert\cf4 \strokec4 ([\{\cf2 \cb1 \strokec2 \
\cb3     alumno_id\cf4 \strokec4 ,\cf2 \strokec2  miniclase_id\cf4 \strokec4 ,\cf2 \strokec2  puntaje\cf4 \strokec4 ,\cf2 \strokec2  completado\cf4 \strokec4 :\cf2 \strokec2  \cf6 \strokec6 true\cf4 \strokec4 ,\cf2 \strokec2  fecha\cf4 \strokec4 :\cf2 \strokec2  \cf6 \strokec6 new\cf2 \strokec2  \cf7 \strokec7 Date\cf4 \strokec4 ()\cf2 \cb1 \strokec2 \
\cb3   \cf4 \strokec4 \}]);\cf2 \cb1 \strokec2 \
\cb3   \cf6 \strokec6 if\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 error\cf4 \strokec4 )\cf2 \strokec2  \cf6 \strokec6 return\cf2 \strokec2  res\cf4 \strokec4 .\cf2 \strokec2 status\cf4 \strokec4 (\cf9 \strokec9 500\cf4 \strokec4 ).\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  error\cf4 \strokec4 :\cf2 \strokec2  error\cf4 \strokec4 .\cf2 \strokec2 message \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\cb3   res\cf4 \strokec4 .\cf2 \strokec2 json\cf4 \strokec4 (\{\cf2 \strokec2  success\cf4 \strokec4 :\cf2 \strokec2  \cf6 \strokec6 true\cf2 \strokec2  \cf4 \strokec4 \});\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \});\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf8 \cb3 \strokec8 // Servir Frontend (Asume que tienes un index.html en /public)\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 app\cf4 \strokec4 .\cf2 \strokec2 use\cf4 \strokec4 (\cf2 \strokec2 express\cf4 \strokec4 .\cf6 \strokec6 static\cf4 \strokec4 (\cf2 \strokec2 path\cf4 \strokec4 .\cf2 \strokec2 join\cf4 \strokec4 (\cf2 \strokec2 __dirname\cf4 \strokec4 ,\cf2 \strokec2  \cf5 \strokec5 'public'\cf4 \strokec4 )));\cf2 \cb1 \strokec2 \
\cb3 app\cf4 \strokec4 .\cf6 \strokec6 get\cf4 \strokec4 (\cf5 \strokec5 '*'\cf4 \strokec4 ,\cf2 \strokec2  \cf4 \strokec4 (\cf2 \strokec2 req\cf4 \strokec4 ,\cf2 \strokec2  res\cf4 \strokec4 )\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3   res\cf4 \strokec4 .\cf2 \strokec2 sendFile\cf4 \strokec4 (\cf2 \strokec2 path\cf4 \strokec4 .\cf2 \strokec2 join\cf4 \strokec4 (\cf2 \strokec2 __dirname\cf4 \strokec4 ,\cf2 \strokec2  \cf5 \strokec5 'public'\cf4 \strokec4 ,\cf2 \strokec2  \cf5 \strokec5 'index.html'\cf4 \strokec4 ));\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \});\cf2 \cb1 \strokec2 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 app\cf4 \strokec4 .\cf2 \strokec2 listen\cf4 \strokec4 (\cf7 \strokec7 PORT\cf4 \strokec4 ,\cf2 \strokec2  \cf4 \strokec4 ()\cf2 \strokec2  \cf4 \strokec4 =>\cf2 \strokec2  \cf4 \strokec4 \{\cf2 \cb1 \strokec2 \
\cb3   console\cf4 \strokec4 .\cf2 \strokec2 log\cf4 \strokec4 (\cf5 \strokec5 `\uc0\u55357 \u56960  Servidor corriendo en puerto \cf4 \strokec4 $\{\cf7 \strokec7 PORT\cf4 \strokec4 \}\cf5 \strokec5 `\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\cb3   console\cf4 \strokec4 .\cf2 \strokec2 log\cf4 \strokec4 (\cf5 \strokec5 `\uc0\u55357 \u56510  Conectado a Supabase: \cf4 \strokec4 $\{\cf2 \strokec2 supabaseUrl\cf4 \strokec4 \}\cf5 \strokec5 `\cf4 \strokec4 );\cf2 \cb1 \strokec2 \
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 \strokec4 \});\cf2 \cb1 \strokec2 \
}