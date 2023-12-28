import { Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../../common/base/base.entity";

@Entity()
export class GameEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  hidden: boolean;
  @Column()
  cost: number;
  @Column({ nullable: true })
  rulesImgUrl: string;
  @Column({ nullable: true })
  logoUrl: string;
  @Column()
  personLimit: number;
  @Column()
  duration: number;
  @Column()
  taskStrategy: string;
  @Column({ default: true })
  autoStart: boolean;
  @Column({ default: true })
  autoEnd: boolean;
  @Column({ default: new Date() })
  plannedAt: Date;
}
