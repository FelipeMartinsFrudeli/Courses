import { Router } from "express";
import multer from "multer";

import * as apiController from "../controllers/apiController";

// save on memory

// const upload = multer({
//     storage: multer.memoryStorage()
// });

// save on storage

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './tmp');
//     },
//     filename: (req, file, cb) => {
//         let randomNumber = Math.floor(Math.random() * 1424123);
//         cb(null, `${randomNumber + Date.now()}.jpg`);
//     }
// });

// const upload = multer({
//     storage
// });

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes(file.mimetype));
    },
    limits: { fieldNameSize: 100, fieldSize: 2000000 }
})

const router = Router();

router.get('/ping', apiController.ping);

router.get('/phrases', apiController.listPhrases);
router.post('/phrases', apiController.createPhrase);
router.get('/phrase/:id', apiController.getPhrase);
router.put('/phrase/:id', apiController.updatePhrase);
router.delete('/phrase/:id', apiController.deletePhrase);

// mutiple files
// upload.array('field', 2)
// req.files

// multiple fields
// upload.fields([
//    { name: 'field1', maxCount: 1 },
//    { name: 'field2', maxCount: 1 }
// ])

// let files = req.files as { [fieldname: string]: Express.Multer.File[] };
// files.field1
// files.field2

router.post('/upload', upload.single('avatar'), apiController.uploadFile);

export default router;