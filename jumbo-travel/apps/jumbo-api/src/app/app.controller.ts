import { Controller, Get, UseGuards } from "@nestjs/common";

import { AppService } from './app.service';
import { JumboAuthGuard } from "./modules/auth/auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
