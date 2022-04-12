const Factory = require('../models/Factory');

module.exports = {
  async index(req, res) {
    const factories = await Factory.findAll();

    return res.json(factories);
  },

  async show(req, res) {
    const { id } = req.params;

    const factory = await Factory.findByPk(id);

    return res.json(factory);
  },

  async store(req, res) {
    const {
      corporate_name, fantasy_name, cnpj, phone, email,
    } = req.body;

    const [corporateNameExists] = await Factory.findAll({ where: { corporate_name } });
    if (corporateNameExists) {
      return res.status(400).json({ error: `Corporate name ${corporate_name} already belogs to other factory!` });
    }

    const [fantasyNameExists] = await Factory.findAll({ where: { fantasy_name } });
    if (fantasyNameExists) {
      return res.status(400).json({ error: `Fantasy name ${fantasy_name} already belogs to other factory!` });
    }

    const [cnpjExists] = await Factory.findAll({ where: { cnpj } });
    if (cnpjExists) {
      return res.status(400).json({ error: `CNPJ ${cnpj} already belogs to other factory!` });
    }

    const [phoneExists] = await Factory.findAll({ where: { phone } });
    if (phoneExists) {
      return res.status(400).json({ error: `Phone ${phone} already belogs to other factory!` });
    }

    const [emailExists] = await Factory.findAll({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ error: `Email ${email} already belogs to other factory!` });
    }

    const factory = await Factory.create({
      corporate_name, fantasy_name, cnpj, phone, email,
    });

    return res.json(factory);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      corporate_name, fantasy_name, cnpj, phone, email,
    } = req.body;

    const idToNumber = Number(id);

    const factory = await Factory.findByPk(id);
    if (!factory) {
      return res.status(400).json({ error: `Not found facotory by id ${id}!` });
    }

    const [corporateNameExists] = await Factory.findAll({ where: { corporate_name } });
    if (corporateNameExists && corporateNameExists.id !== idToNumber) {
      return res.status(400).json({ error: `Corporate name ${corporate_name} already belogs to other factory!` });
    }

    const [fantasyNameExists] = await Factory.findAll({ where: { fantasy_name } });
    if (fantasyNameExists && fantasyNameExists.id !== idToNumber) {
      return res.status(400).json({ error: `Fantasy name ${fantasy_name} already belogs to other factory!` });
    }

    const [cnpjExists] = await Factory.findAll({ where: { cnpj } });
    if (cnpjExists && cnpjExists.id !== idToNumber) {
      return res.status(400).json({ error: `CNPJ ${cnpj} already belogs to other factory!` });
    }

    const [phoneExists] = await Factory.findAll({ where: { phone } });
    if (phoneExists && phoneExists.id !== idToNumber) {
      return res.status(400).json({ error: `Phone ${phone} already belogs to other factory!` });
    }

    const [emailExists] = await Factory.findAll({ where: { email } });
    if (emailExists && emailExists.id !== idToNumber) {
      return res.status(400).json({ error: `Email ${email} already belogs to other factory!` });
    }

    await factory.update({
      corporate_name, fantasy_name, cnpj, phone, email,
    });

    return res.json(factory);
  },

  async delete(req, res) {
    const { id } = req.params;

    const factory = await Factory.findByPk(id);

    if (!factory) {
      return res.status(400).json({ error: `Not found user by id ${id}!` });
    }

    await factory.destroy();

    return res.json(`Factory ${factory.corporate_name} was successfully deleted.`);
  },
};
