@echo off
echo 🦡 Запускаю сервер для сайта "Барсуки - это круто!"
echo.
echo 📍 Адрес сайта: http://localhost:8000
echo 🛑 Для остановки сервера нажми Ctrl+C
echo.
python -m http.server 8000
pause 