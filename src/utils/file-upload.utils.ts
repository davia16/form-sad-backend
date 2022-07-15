import { UnsupportedMediaTypeException } from '@nestjs/common';
import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new UnsupportedMediaTypeException(
        'Apenas arquivos de imagem são permitidos.',
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0].toLowerCase().replace(/\s/g, '');
  const fileExtName = extname(file.originalname);
  callback(null, `${name.slice(0, 15)}-${Date.now()}${fileExtName}`);
};
