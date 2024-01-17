
import { CreateCategoryController } from '@modules/cars/usecases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/usecases/importCategory/ImportCategoryController'
import {Router} from 'express'
import multer from 'multer'

const categoriesRoutes = Router()
const importCategoryController = new ImportCategoryController()
const createCategoryController = new CreateCategoryController()

const upload = multer({
  dest: './uploads'
})

categoriesRoutes.post('/', createCategoryController.handle)
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle)

export {categoriesRoutes}
