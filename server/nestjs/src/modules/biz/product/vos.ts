import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumber, Min, Max } from 'class-validator';

export class ProductCIVO {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({ description: 'The price of the product' })
  @IsNumber()
  @Min(0.5)
  @Max(10000)
  price: number;
}

export class ProductCOVO {
  @ApiProperty({ description: 'The id of the product' })
  id: number;

  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({ description: 'The price of the product' })
  @IsNumber()
  @Min(0.5)
  @Max(10000)
  price: number;
}