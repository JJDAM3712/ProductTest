import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import productRoutes from "./product.routes";
import { swaggerDoc } from '../documentation/swagger';


const router: Router = Router();

// swagger documentation JSON
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swaggerDoc);
});

// routes to API products
router.use('/api', productRoutes)


export default router;