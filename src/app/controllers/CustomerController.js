/* eslint-disable linebreak-style */
/* eslint-disable object-property-newline */
/* eslint-disable linebreak-style */
const Customer = require('../models/Customer');

module.exports = {
  async index(req, res) {
    const customers = await Customer.findAll();

    return res.json(customers);
  },

  async show(req, res) {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(400).json({ error: `Not found customer by id: ${id}.` });
    }
    return res.json(customer);
  },
  async store(req, res) {
    const {
      corporateName, fantasyName, cnpj, stateRegistration, buyer, phone, email,
      purchaseCredit, customerAddress, addressNumber, complement, district,
      city, state, country, cep,
    } = req.body;

    const [customerExists] = await Customer.findAll({ where: { corporateName } });
    if (customerExists) {
      return res.status(400).json({ error: `Customer with name ${corporateName} already exists` });
    }

    const customer = await Customer.create({
      corporateName, fantasyName, cnpj, stateRegistration, buyer, phone, email,
      purchaseCredit, customerAddress, addressNumber, complement, district,
      city, state, country, cep,
    });

    return res.json(customer);
  },

  async update(req, res) {
    const { id } = req.params;
    const { corporateName } = req.body;
    if (!corporateName) {
      return res.status(400).json({ error: 'corporateName is required!' });
    }
    const { fantasyName } = req.body;
    if (!fantasyName) {
      return res.status(400).json({ error: 'fantasyName is required!' });
    }
    const { cnpj } = req.body;
    if (!cnpj) {
      return res.status(400).json({ error: 'cnpj is required!' });
    }
    const { stateRegistration } = req.body;
    if (!stateRegistration) {
      return res.status(400).json({ error: 'stateRegistration is required!' });
    }
    const { buyer } = req.body;
    if (!buyer) {
      return res.status(400).json({ error: 'buyer is required!' });
    }
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'phone is required!' });
    }
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'email is required!' });
    }
    const { purchaseCredit } = req.body;
    if (!purchaseCredit) {
      return res.status(400).json({ error: 'purchaseCredit is required!' });
    }
    const { customerAddress } = req.body;
    if (!customerAddress) {
      return res.status(400).json({ error: 'customerAddress is required!' });
    }
    const { addressNumber } = req.body;
    if (!addressNumber) {
      return res.status(400).json({ error: 'addressNumber is required!' });
    }
    const { complement } = req.body;
    if (!complement) {
      return res.status(400).json({ error: 'complement is required!' });
    }
    const { district } = req.body;
    if (!district) {
      return res.status(400).json({ error: 'district is required!' });
    }
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'city is required!' });
    }
    const { state } = req.body;
    if (!state) {
      return res.status(400).json({ error: 'state is required!' });
    }
    const { country } = req.body;
    if (!country) {
      return res.status(400).json({ error: 'country is required!' });
    }
    const { cep } = req.body;
    if (!cep) {
      return res.status(400).json({ error: 'cep is required!' });
    }
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(400).json({ error: `Not found customer by id: ${id}.` });
    }
    // verificar se necessario todos os dados.
    const [customerExists] = await Customer.findAll({ where: { corporateName } });
    if (customerExists && customerExists.id !== id) {
      return res.status(400).json({ error: 'Corporate Name already exists!' });
    }
    customer.corporateName = corporateName;
    customer.fantasyName = fantasyName;
    customer.cnpj = cnpj;
    customer.stateRegistration = stateRegistration;
    customer.buyer = buyer;
    customer.phone = phone;
    customer.email = email;
    customer.purchaseCredit = purchaseCredit;
    customer.customerAddress = customerAddress;
    customer.addressNumber = addressNumber;
    customer.complement = complement;
    customer.district = district;
    customer.city = city;
    customer.state = state;
    customer.country = country;
    customer.cep = cep;

    await customer.save();

    return res.json(customer);
  },

  async delete(req, res) {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(400).json({ error: `Not found customer by id: ${id}.` });
    }

    await customer.destroy();

    return res.json(`Customer ${customer.name} was successfully deleted.`);
  },
};
