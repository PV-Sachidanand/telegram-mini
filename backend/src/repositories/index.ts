import UserRepository from "../repositories/userRepository";

/**
 * RepositoryManager is a singleton class that manages the instantiation of repositories.
 * It provides a lazy-loaded instance of UserRepository.
 */
class RepositoryManager {
  private _userRepositoryInstance: UserRepository | undefined;

  /**
   * Constructor for RepositoryManager.
   * Initializes the instance with no UserRepository instance.
   */
  constructor() {}

  /**
   * Getter for UserRepository instance.
   * If the instance does not exist, it creates a new instance and returns it.
   * If the instance exists, it returns the existing instance.
   *
   * @returns The instance of UserRepository.
   */
  protected get userRepository() {
    if (!this._userRepositoryInstance) {
      this._userRepositoryInstance = new UserRepository();
    }
    return this._userRepositoryInstance;
  }
}

export default RepositoryManager;
