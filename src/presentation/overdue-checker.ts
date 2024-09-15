import { CronJob } from "cron";
import type { Cron } from "../domains/services/cron";
import { inject, injectable } from "inversify";
import type { Service } from "./service";
import TYPES from "../types";
@injectable()
export class OverdueChecker implements Cron {
  private cron: CronJob;
  constructor(@inject(TYPES.Service) private _service: Service) {
    this.cron = new CronJob(
      "*/15 * * * * *",
      this._service.updateMemberPenalty.bind(this._service),
      null,
      false,
      "Asia/Jakarta"
    );
  }
  startCron(): void {
    this.cron.start();
  }

  stopCron(): void {
    this.cron.stop();
  }
}
