import { Router, type Response, type Request } from 'express';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Contracts route' });
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Contract created' });
});

router.get('/:id', (_: Request, res: Response) => {
  res.status(200).json({ message: `Contract with ID: ${_.params.id}` });
});

router.put('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Contract with ID: ${req.params.id} updated` });
});

router.patch('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Contract with ID: ${req.params.id} partially updated` });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Contract with ID: ${req.params.id} deleted` });
});


export default router;