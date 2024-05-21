export class PartnerAlreadyExistError extends Error {
  constructor() {
    super('Partner already exists')
    this.name = 'PartnerAlreadyExistError'
  }
}