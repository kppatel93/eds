import createField from './form-fields.js';

async function createForm(formHref, submitHref) {
  const json = [
    {
      Name: 'headline',
      Type: 'heading',
      Label: 'Please fill out the form below',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'description',
      Type: 'plaintext',
      Label:
        'Enter your favorite quote, and you could win a prize (not really, this is just an example form)',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'quote',
      Type: 'text',
      Label: 'Quote',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: 'x',
      Style: '',
      ID: '',
      Fieldset: 'quoteFS',
    },
    {
      Name: 'who',
      Type: 'text',
      Label: 'Who said it?',
      Placeholder: 'Mark Twain, probably',
      Value: '',
      Options: '',
      Mandatory: 'true',
      Style: '',
      ID: '',
      Fieldset: 'quoteFS',
    },
    {
      Name: 'quoteFS',
      Type: 'fieldset',
      Label: '',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'quoteSource',
      Type: 'radio',
      Label: 'Movie',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: 'quoteSourceFS',
    },
    {
      Name: 'quoteSource',
      Type: 'radio',
      Label: 'Book',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: 'quoteSourceFS',
    },
    {
      Name: 'quoteSource',
      Type: 'radio',
      Label: 'TV',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: 'quoteSourceFS',
    },
    {
      Name: 'quoteSource',
      Type: 'radio',
      Label: 'Other',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: 'quoteSourceFS',
    },
    {
      Name: 'quoteSourceFS',
      Type: 'fieldset',
      Label: 'Quote source',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'quoteSourceOther',
      Type: 'text-area',
      Label: 'If "Other," please specify',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'reasons',
      Type: 'heading',
      Label: 'Select the reason(s) you like the quote',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: 'sub-heading',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'humor',
      Type: 'checkbox',
      Label: 'Humor',
      Placeholder: '',
      Value: 'humor',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'insight',
      Type: 'checkbox',
      Label: 'Insight',
      Placeholder: '',
      Value: 'insight',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'somethingElse',
      Type: 'checkbox',
      Label: 'Something else?',
      Placeholder: '',
      Value: 'something else',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'message',
      Type: 'plaintext',
      Label: 'Some other example fields',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'toggleExample',
      Type: 'toggle',
      Label: '',
      Placeholder: '',
      Value: 'yes',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'select',
      Type: 'select',
      Label: 'Country',
      Placeholder: '',
      Value: 'Germany',
      Options: 'USA, Germany, Switzerland, Canada',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'externalSelect',
      Type: 'select',
      Label: 'State',
      Placeholder: 'Select a state...',
      Value: '',
      Options:
        'https://main--helix-block-collection--adobe.hlx.page/block-collection/form.json?sheet=states',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: 'submit',
      Type: 'submit',
      Label: '',
      Placeholder: '',
      Value: '',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
    {
      Name: '',
      Type: 'confirmation',
      Label: '',
      Placeholder: '',
      Value:
        'https://main--helix-block-collection--adobe.hlx.live/block-collection/form-thank-you',
      Options: '',
      Mandatory: '',
      Style: '',
      ID: '',
      Fieldset: '',
    },
  ];

  const form = document.createElement('form');
  form.dataset.action = submitHref;

  const fields = await Promise.all(
    json.map((fd) => createField(fd, form)),
  );

  fields.forEach((field) => {
    if (field) {
      form.append(field);
    }
  });

  // group fields into fieldsets
  const fieldsets = form.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    form
      .querySelectorAll(`[data-fieldset="${fieldset.name}"`)
      .forEach((field) => {
        fieldset.append(field);
      });
  });

  return form;
}

function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && field.type !== 'submit' && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) payload[field.name] = field.value;
      } else if (field.type === 'checkbox') {
        if (field.checked) {
          payload[field.name] = payload[field.name]
            ? `${payload[field.name]},${field.value}`
            : field.value;
        }
      } else {
        payload[field.name] = field.value;
      }
    }
  });
  return payload;
}

async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') === 'true') return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;

    // create payload
    const payload = generatePayload(form);
    const response = await fetch(form.dataset.action, {
      method: 'POST',
      body: JSON.stringify({ data: payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      if (form.dataset.confirmation) {
        window.location.href = form.dataset.confirmation;
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    form.setAttribute('data-submitting', 'false');
    submit.disabled = false;
  }
}

export default async function decorate(block) {
  // const links = [...block.querySelectorAll('a')].map((a) => a.href);

  const formLink = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/form.json';
  const submitLink = 'https://httpbin.org/post';
  if (!formLink || !submitLink) return;

  const form = await createForm(formLink, submitLink);
  block.replaceChildren(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = form.checkValidity();
    if (valid) {
      handleSubmit(form);
    } else {
      const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
      if (firstInvalidEl) {
        firstInvalidEl.focus();
        firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
