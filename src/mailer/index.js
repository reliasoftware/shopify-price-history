const hogan = require('hogan.js');
const fs = require('fs-extra');
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const Promise = require('bluebird');
const { MAILGUN_KEY, MAILGUN_DOMAIN, FROM_EMAIL } = require('../config').mailer;

const confiMailGun = { auth: { api_key: MAILGUN_KEY, domain: MAILGUN_DOMAIN } };

module.exports = {
  async loadTemplate(name) {
    const content = await fs.readFile(`src/mailer/templates/${name}.hbs`, 'utf-8');
    return hogan.compile(content);
  },
  async sendEmail(options, context = {}) {
    const template = await this.loadTemplate(options.template);
    const from = FROM_EMAIL;
    const html = template.render(Object.assign(context));
    const transport = nodemailer.createTransport(mailgunTransport(confiMailGun));

    const result = await this.deliver(Object.assign(options, { from, html }), transport);
    return result;
  },

  deliver(options, transport) {
    return new Promise((resolve, reject) => {
      transport.sendMail(options, (err, info) => {
        if (err) {
          return reject(err);
        }
        return resolve(info);
      });
    });
  },
};
