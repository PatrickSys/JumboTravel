import { PartialType } from '@nestjs/mapped-types';
import { CreateProductstockDto } from './create-productstock.dto';

export class UpdateProductstockDto extends PartialType(CreateProductstockDto) {}
