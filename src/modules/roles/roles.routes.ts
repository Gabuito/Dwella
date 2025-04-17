import { Router, type Response, type Request } from 'express';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Roles route' });
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Role created' });
});

router.get('/:id', (_: Request, res: Response) => {
  res.status(200).json({ message: `Role with ID: ${_.params.id}` });
});

router.put('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Role with ID: ${req.params.id} updated` });
});

router.patch('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Role with ID: ${req.params.id} partially updated` });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: `Role with ID: ${req.params.id} deleted` });
});

export default router;