
        const form = document.getElementById('registrationForm');
        const programa1 = document.getElementById('programa1');
        const programa2 = document.getElementById('programa2');
        const programa3 = document.getElementById('programa3');

        // Validación en tiempo real para evitar programas duplicados
        function validatePrograms() {
            const p1 = programa1.value;
            const p2 = programa2.value;
            const p3 = programa3.value;

            const error1 = document.getElementById('error1');
            const error2 = document.getElementById('error2');
            const error3 = document.getElementById('error3');

            error1.style.display = 'none';
            error2.style.display = 'none';
            error3.style.display = 'none';

            let isValid = true;

            if (p1 && p2 && p1 === p2) {
                error2.textContent = '⚠️ Este programa ya fue seleccionado en la Primera Opción';
                error2.style.display = 'block';
                isValid = false;
            }

            if (p1 && p3 && p1 === p3) {
                error3.textContent = '⚠️ Este programa ya fue seleccionado en la Primera Opción';
                error3.style.display = 'block';
                isValid = false;
            }

            if (p2 && p3 && p2 === p3) {
                error3.textContent = '⚠️ Este programa ya fue seleccionado en la Segunda Opción';
                error3.style.display = 'block';
                isValid = false;
            }

            return isValid;
        }

        programa1.addEventListener('change', validatePrograms);
        programa2.addEventListener('change', validatePrograms);
        programa3.addEventListener('change', validatePrograms);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validatePrograms()) {
                alert('Por favor, selecciona 3 programas diferentes.');
                return;
            }

            const submitBtn = document.getElementById('submitBtn');
            const loading = document.getElementById('loading');
            const successMessage = document.getElementById('successMessage');

            submitBtn.disabled = true;
            loading.style.display = 'block';
            successMessage.style.display = 'none';

            const formData = {
                nombreCompleto: document.getElementById('nombreCompleto').value,
                tipoDocumento: document.getElementById('tipoDocumento').value,
                nroDocumento: document.getElementById('nroDocumento').value,
                colegio: document.getElementById('colegio').value,
                grado: document.getElementById('grado').value,
                telefono: document.getElementById('telefono').value,
                nombreContacto: document.getElementById('nombreContacto').value,
                telefonoContacto: document.getElementById('telefonoContacto').value,
                programa1: programa1.value,
                programa2: programa2.value,
                programa3: programa3.value,
                timestamp: new Date().toLocaleString('es-CO')
            };

            // IMPORTANTE: Reemplaza con tu URL de Google Apps Script
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxHQ3Gt7UsKD2UzU4OFxCNowAYxzgUW8QSK9fei3JA3JsJdIvjhjGZ6Ni3gKHXYd8LZnA/exec';

            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                // Con no-cors no podemos leer la respuesta, asumimos éxito
                successMessage.style.display = 'block';
                form.reset();
                
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'index.html'; // Cambia por tu página principal
                }, 2000);

                /*setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);*/

            } catch (error) {
                alert('Error al enviar el formulario. Por favor, intenta nuevamente.');
                console.error('Error:', error);
            } finally {
                submitBtn.disabled = false;
                loading.style.display = 'none';
            }
        });
 