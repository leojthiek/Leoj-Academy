// initializeDataSource.ts
import { AppDataSource } from "../data-source";

let initialized = false;

export default async function initializeDataSource() {
  if (!initialized) {
    try {
      await AppDataSource.initialize();
      initialized = true;
      console.log("Data source initialized");
    } catch (error) {
      console.error("Failed to initialize data source:", error);
      throw error;
    }
  }
}
