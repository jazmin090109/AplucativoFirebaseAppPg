
import { Router } from 'express';
import { getPool } from '../db';
// Importaremos un tipo 'User' en el futuro para mayor claridad

const router = Router();

router.post('/login', async (req, res) => {
    const { associateNumber, nip } = req.body;

    if (!associateNumber || !nip) {
        return res.status(400).json({ message: 'El número de asociada y el NIP son requeridos.' });
    }

    try {
        const pool = getPool();

        // OJO: La consulta y la comparación de NIP deben ajustarse a tu esquema real.
        // Esta es una implementación de ejemplo.
        const result = await pool.request()
            .input('associateNumber', associateNumber)
            .query('SELECT * FROM Users WHERE AssociateNumber = @associateNumber');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Asociada no encontrada.' });
        }

        const user = result.recordset[0];

        // TODO: Implementar la lógica de comparación de NIP.
        // Por ahora, asumimos que el NIP es correcto si el usuario existe.
        // En la vida real, NUNCA debes almacenar NIPs en texto plano.
        // Debes usar una librería como bcrypt para comparar hashes.
        const isNipValid = (nip === user.NIP); // ¡SOLO PARA EJEMPLO!

        if (!isNipValid) {
            return res.status(401).json({ message: 'NIP incorrecto.' });
        }

        // No devuelvas el NIP ni otros datos sensibles
        const userResponse = {
            id: user.UserID,
            name: user.Name,
            email: user.Email, // Asumiendo que tienes un campo de email
            associateNumber: user.AssociateNumber
        };

        res.json(userResponse);

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default router;
