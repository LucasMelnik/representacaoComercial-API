'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('customers', 'corporateName', 'corporate_name');
    await queryInterface.renameColumn('customers', 'fantasyName', 'fantasy_name');
    await queryInterface.renameColumn('customers', 'stateRegistration', 'state_registration');
    await queryInterface.renameColumn('customers', 'purchaseCredit', 'purchase_credit');
    await queryInterface.renameColumn('customers', 'customerAddress', 'customer_address');
    await queryInterface.renameColumn('customers', 'addressNumber', 'address_number');
  },

  async down(queryInterface) {
    await queryInterface.renameColumn('customers', 'corporate_name', 'corporateName');
    await queryInterface.renameColumn('customers', 'fantasy_name', 'fantasyName');
    await queryInterface.renameColumn('customers', 'state_registration', 'stateRegistration');
    await queryInterface.renameColumn('customers', 'purchase_credit', 'purchaseCredit');
    await queryInterface.renameColumn('customers', 'customer_address', 'customerAddress');
    await queryInterface.renameColumn('customers', 'address_number', 'addressNumber');
  },
};
