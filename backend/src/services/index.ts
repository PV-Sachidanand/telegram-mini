import AuthService from "./authServices";
import JWTServices from "./jwtServices";

/**
 * ServiceManager is a singleton class that manages instances of AuthService and JWTServices.
 * It provides a way to access these services without having to create new instances every time.
 */
class ServiceManager {
  private authServicesInstance: AuthService | undefined;
  private jwtServicesInstance: JWTServices | undefined;
  constructor() {}

  /**
   * Getter for AuthService instance. If an instance does not exist, it creates a new one.
   * @returns The AuthService instance.
   */
  protected get authServices() {
    if (!this.authServicesInstance) {
      this.authServicesInstance = new AuthService();
    }
    return this.authServicesInstance;
  }

  /**
   * Getter for JWTServices instance. If an instance does not exist, it creates a new one.
   * @returns The JWTServices instance.
   */
  protected get jwtServices() {
    if (!this.jwtServicesInstance) {
      this.jwtServicesInstance = new JWTServices();
    }
    return this.jwtServicesInstance;
  }
}

export default ServiceManager;
