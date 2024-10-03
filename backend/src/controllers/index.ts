import ReferralController from "./referralController";
import UserController from "./userController";

/**
 * ControllerManager is a class that manages instances of controllers.
 * It provides a way to access controller instances without having to create new instances every time.
 */
class ControllerManager {
  private userControllerInstance: UserController | undefined;
  private referralControllerInstance: ReferralController | undefined;
  /**
   * Constructor for ControllerManager. Initializes the controller manager.
   */
  constructor() {}
  /**
   * Getter for UserController instance. If an instance does not exist, it creates a new one.
   * @returns The UserController instance.
   */
  protected get userController() {
    if (!this.userControllerInstance) {
      this.userControllerInstance = new UserController();
    }
    return this.userControllerInstance;
  }

  /**
   * Getter for ReferralController instance. If an instance does not exist, it creates a new one.
   * @returns The ReferralController instance.
   */
  protected get referralController() {
    if (!this.referralControllerInstance) {
      this.referralControllerInstance = new ReferralController();
    }
    return this.referralControllerInstance;
  }
}

export default ControllerManager;
