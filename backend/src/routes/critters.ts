import { Router, Request, Response } from 'express';
import { CritterEngine } from '../services/CritterEngine.js';
import { BSCService } from '../services/BSCService.js';

const router = Router();
const critterEngine = new CritterEngine();
const bscService = new BSCService();

router.post('/wallet/scan', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    const tokens = await bscService.scanWallet(walletAddress);
    res.json({ success: true, tokens });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scan wallet' });
  }
});

router.post('/critter/generate', async (req: Request, res: Response) => {
  try {
    const { tokenData, walletAddress } = req.body;
    
    if (!tokenData) {
      return res.status(400).json({ error: 'Token data required' });
    }

    const critter = await critterEngine.generateCritter(tokenData, walletAddress);
    res.json({ success: true, critter });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate critter' });
  }
});

router.post('/critter/interact', async (req: Request, res: Response) => {
  try {
    const { critterId, action, walletAddress } = req.body;
    
    if (!critterId || !action) {
      return res.status(400).json({ error: 'Critter ID and action required' });
    }

    const validActions = ['feed', 'play', 'clean', 'train'];
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const updatedCritter = await critterEngine.interact(critterId, action, walletAddress);
    res.json({ success: true, critter: updatedCritter });
  } catch (error) {
    res.status(500).json({ error: 'Failed to interact with critter' });
  }
});

router.get('/critter/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const critter = critterEngine.getCritter(id);
    
    if (!critter) {
      return res.status(404).json({ error: 'Critter not found' });
    }

    const dailyMessage = critterEngine.generateDailyMessage(critter);
    res.json({ success: true, critter, dailyMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get critter' });
  }
});

router.get('/collection/:walletAddress', async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;
    const critters = critterEngine.getCollection(walletAddress);
    res.json({ success: true, critters });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get collection' });
  }
});

export default router;
