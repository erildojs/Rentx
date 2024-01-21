
import { CreateCategoryController } from '@modules/cars/usecases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/usecases/importCategory/ImportCategoryController'
import {Router} from 'express'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const categoriesRoutes = Router()
const importCategoryController = new ImportCategoryController()
const createCategoryController = new CreateCategoryController()

const upload = multer({
  dest: './uploads'
})

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle)
categoriesRoutes.post('/import', upload.single('file'), ensureAuthenticated, ensureAdmin, importCategoryController.handle)

export {categoriesRoutes}
