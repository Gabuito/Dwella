import { Router, type Response, type Request } from 'express';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Properties route' });
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Property created' });
});

router.get('/:id', (_: Request, res: Response) => {
  res.status(200).json({ message: `Property with ID: ${_.params.id}` });
});

router.put('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Property with ID: ${req.params.id} updated` });
});

router.patch('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Property with ID: ${req.params.id} partially updated` });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Property with ID: ${req.params.id} deleted` });
});

export default router;