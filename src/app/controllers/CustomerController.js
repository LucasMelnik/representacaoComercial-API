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
      corporate_name, fantasy_name, cnpj, state_registration, buyer, phone, email,
      purchase_credit, customer_address, address_number, complement, district,
      city, state, country, zip,
    } = req.body;

    if (!corporate_name) {
      return res.status(400).json({ error: 'Corporate name is required!' });
    }

    if (!cnpj) {
      return res.status(400).json({ error: 'CNPJ is required!' });
    }

    if (!state_registration) {
      return res.status(400).json({ error: 'State registration is required!' });
    }

    const [customerExists] = await Customer.findAll({ where: { corporate_name } });
    if (customerExists) {
      return res.status(400).json({ error: `Customer with name ${corporate_name} already exists` });
    }

    const [cnpjExists] = await Customer.findAll({ where: { cnpj } });
    if (cnpjExists) {
      return res.status(400).json({ error: 'Customer with this CNPJ already exists!' });
    }

    const customer = await Customer.create({
      corporate_name,
      fantasy_name,
      cnpj,
      state_registration,
      buyer,
      phone,
      email,
      purchase_credit,
      customer_address,
      address_number,
      complement,
      district,
      city,
      state,
      country,
      zip,
    });

    return res.json(customer);
  },

  // TODO: SET PURCHASE CREDIT ALLOW NULL
  async update(req, res) {
    const { id } = req.params;
    const {
      corporate_name, fantasy_name, cnpj, state_registration, buyer, phone, email,
      purchase_credit, customer_address, address_number, complement, district,
      city, state, country, zip,
    } = req.body;

    const idToNumber = Number(id);

    if (!corporate_name) {
      return res.status(400).json({ error: 'Corporate name is required!' });
    }

    if (!cnpj) {
      return res.status(400).json({ error: 'CNPJ is required!' });
    }

    if (!state_registration) {
      return res.status(400).json({ error: 'State registration is required!' });
    }

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(400).json({ error: `Not found customer by id: ${id}.` });
    }

    const [corporateNameExists] = await Customer.findAll({ where: { corporate_name } });
    if (corporateNameExists && corporateNameExists.id !== idToNumber) {
      return res.status(400).json({ error: 'Corporate Name already exists!' });
    }

    const [cnpjExists] = await Customer.findAll({ where: { cnpj } });
    if (cnpjExists && cnpjExists.id !== idToNumber) {
      return res.status(400).json({ error: 'Customer with this CNPJ already exists!' });
    }

    await customer.update({
      corporate_name,
      fantasy_name,
      cnpj,
      state_registration,
      buyer,
      phone,
      email,
      purchase_credit,
      customer_address,
      address_number,
      complement,
      district,
      city,
      state,
      country,
      zip,
    });

    return res.json(customer);
  },

  async delete(req, res) {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(400).json({ error: `Not found customer by id: ${id}.` });
    }

    await customer.destroy();

    return res.json(`Customer ${customer.corporate_name} was successfully deleted.`);
  },
};
