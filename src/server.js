import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📑 Swagger / Documentação: http://localhost:${PORT}/api-docs`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
  console.log(`======================================================\n`);
});
