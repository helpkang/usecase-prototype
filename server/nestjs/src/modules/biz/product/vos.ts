import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, Length, IsNumber, Min, Max, IsDefined } from 'class-validator';

export class ProductCIVO {
  @IsDefined()
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  @Length(3, 100)
  name: string;

  @IsDefined()
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