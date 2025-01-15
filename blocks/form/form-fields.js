import { toClassName } from '../../scripts/aem.js';

function createFieldWrapper(fd) {
  const fieldWrapper = document.createElement('div');
  if (fd.Style) fieldWrapper.className = fd.Style;
  fieldWrapper.classList.add('field-wrapper', `${fd.Type}-wrapper`);

  fieldWrapper.dataset.fieldset = fd.Fieldset;

  return fieldWrapper;
}

const ids = [];
function generateFieldId(fd, suffix = '') {
  const slug = toClassName(`form-${fd.Name}${suffix}`);
  ids[slug] = ids[slug] || 0;
  const idSuffix = ids[slug] ? `-${ids[slug]}` : '';
  ids[slug] += 1;
  return `${slug}${idSuffix}`;
}

function createLabel(fd) {
  const label = document.createElement('label');
  label.id = generateFieldId(fd, '-label');
  label.textContent = fd.Label || fd.Name;
  label.setAttribute('for', fd.Id);
  if (
    fd.Mandatory.toLowerCase() === 'true'
    || fd.Mandatory.toLowerCase() === 'x'
  ) {
    label.dataset.required = true;
  }
  return label;
}

function setCommonAttributes(field, fd) {
  field.id = fd.Id;
  field.name = fd.Name;
  field.required = fd.Mandatory
    && (fd.Mandatory.toLowerCase() === 'true'
      || fd.Mandatory.toLowerCase() === 'x');
  field.placeholder = fd.Placeholder;
  field.value = fd.Value;
}

const createHeading = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);

  const level = fd.Style && fd.Style.includes('sub-heading') ? 3 : 2;
  const heading = document.createElement(`h${level}`);
  heading.textContent = fd.Value || fd.Label;
  heading.id = fd.Id;

  fieldWrapper.append(heading);

  return { field: heading, fieldWrapper };
};

const createPlaintext = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);

  const text = document.createElement('p');
  text.textContent = fd.Value || fd.Label;
  text.id = fd.Id;

  fieldWrapper.append(text);

  return { field: text, fieldWrapper };
};

const createSelect = async (fd) => {
  const select = document.createElement('select');
  setCommonAttributes(select, fd);
  const addOption = ({ text, value }) => {
    const option = document.createElement('option');
    option.text = text.trim();
    option.value = value.trim();
    if (option.value === select.value) {
      option.setAttribute('selected', '');
    }
    select.add(option);
    return option;
  };

  if (fd.Placeholder) {
    const ph = addOption({ text: fd.Placeholder, value: '' });
    ph.setAttribute('disabled', '');
  }

  if (fd.Options) {
    let options = [];
    if (fd.Options.startsWith('https://')) {
      const optionsUrl = new URL(fd.Options);
      const resp = await fetch(`${optionsUrl.pathname}${optionsUrl.search}`);
      const json = [
        {
          Option: 'Alabama',
          Value: 'AL',
        },
        {
          Option: 'Alaska',
          Value: 'AK',
        },
        {
          Option: 'Arizona',
          Value: 'AZ',
        },
        {
          Option: 'Arkansas',
          Value: 'AR',
        },
        {
          Option: 'California',
          Value: 'CA',
        },
        {
          Option: 'Colorado',
          Value: 'CO',
        },
        {
          Option: 'Connecticut',
          Value: 'CT',
        },
        {
          Option: 'Deleware',
          Value: 'DE',
        },
        {
          Option: 'District of Columbia',
          Value: 'DC',
        },
        {
          Option: 'Florida',
          Value: 'FL',
        },
        {
          Option: 'Georgia',
          Value: 'GA',
        },
        {
          Option: 'Guam',
          Value: 'GU',
        },
        {
          Option: 'Hawaii',
          Value: 'HI',
        },
        {
          Option: 'Idaho',
          Value: 'ID',
        },
        {
          Option: 'Illinois',
          Value: 'IL',
        },
        {
          Option: 'Indiana',
          Value: 'IN',
        },
        {
          Option: 'Iowa',
          Value: 'IA',
        },
        {
          Option: 'Kansas',
          Value: 'KS',
        },
        {
          Option: 'Kentucky',
          Value: 'KY',
        },
        {
          Option: 'Lousiana',
          Value: 'LA',
        },
        {
          Option: 'Maine',
          Value: 'ME',
        },
        {
          Option: 'Maryland',
          Value: 'MD',
        },
        {
          Option: 'Massachusetts',
          Value: 'MA',
        },
        {
          Option: 'Michigan',
          Value: 'MI',
        },
        {
          Option: 'Minnesota',
          Value: 'MN',
        },
        {
          Option: 'Mississippi',
          Value: 'MS',
        },
        {
          Option: 'Missouri',
          Value: 'MO',
        },
        {
          Option: 'Montana',
          Value: 'MT',
        },
        {
          Option: 'Nebraska',
          Value: 'NE',
        },
        {
          Option: 'Nevada',
          Value: 'NV',
        },
        {
          Option: 'New Hampshire',
          Value: 'NH',
        },
        {
          Option: 'New Jersey',
          Value: 'NJ',
        },
        {
          Option: 'New Mexico',
          Value: 'NM',
        },
        {
          Option: 'New York',
          Value: 'NY',
        },
        {
          Option: 'North Carolina',
          Value: 'NC',
        },
        {
          Option: 'North Dakota',
          Value: 'ND',
        },
        {
          Option: 'Ohio',
          Value: 'OH',
        },
        {
          Option: 'Oklahoma',
          Value: 'OK',
        },
        {
          Option: 'Oregon',
          Value: 'OR',
        },
        {
          Option: 'Pennsylvania',
          Value: 'PA',
        },
        {
          Option: 'Rhode Island',
          Value: 'RI',
        },
        {
          Option: 'Saipan',
          Value: 'MP',
        },
        {
          Option: 'South Carolina',
          Value: 'SC',
        },
        {
          Option: 'South Dakota',
          Value: 'SD',
        },
        {
          Option: 'Tennessee',
          Value: 'TN',
        },
        {
          Option: 'Texas',
          Value: 'TX',
        },
        {
          Option: 'Utah',
          Value: 'UT',
        },
        {
          Option: 'Vermont',
          Value: 'VT',
        },
        {
          Option: 'Virginia',
          Value: 'VA',
        },
        {
          Option: 'Washington',
          Value: 'WA',
        },
        {
          Option: 'West Virginia',
          Value: 'WV',
        },
        {
          Option: 'Wisconsin',
          Value: 'WI',
        },
        {
          Option: 'Wyoming',
          Value: 'WY',
        },
      ];
      json.forEach((opt) => {
        options.push({
          text: opt.Option,
          value: opt.Value || opt.Option,
        });
      });
    } else {
      options = fd.Options.split(',').map((opt) => ({
        text: opt.trim(),
        value: opt.trim().toLowerCase(),
      }));
    }

    options.forEach((opt) => addOption(opt));
  }

  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(select);
  fieldWrapper.prepend(createLabel(fd));

  return { field: select, fieldWrapper };
};

const createConfirmation = (fd, form) => {
  form.dataset.confirmation = new URL(fd.Value).pathname;

  return {};
};

const createSubmit = (fd) => {
  const button = document.createElement('button');
  button.textContent = fd.Label || fd.Name;
  button.classList.add('button');
  button.type = 'submit';

  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(button);
  return { field: button, fieldWrapper };
};

const createTextArea = (fd) => {
  const field = document.createElement('textarea');
  setCommonAttributes(field, fd);

  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);
  fieldWrapper.append(field);
  fieldWrapper.prepend(label);

  return { field, fieldWrapper };
};

const createInput = (fd) => {
  const field = document.createElement('input');
  field.type = fd.Type;
  setCommonAttributes(field, fd);

  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);
  fieldWrapper.append(field);
  if (fd.Type === 'radio' || fd.Type === 'checkbox') {
    fieldWrapper.append(label);
  } else {
    fieldWrapper.prepend(label);
  }

  return { field, fieldWrapper };
};

const createFieldset = (fd) => {
  const field = document.createElement('fieldset');
  setCommonAttributes(field, fd);

  if (fd.Label) {
    const legend = document.createElement('legend');
    legend.textContent = fd.Label;
    field.append(legend);
  }

  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(field);

  return { field, fieldWrapper };
};

const createToggle = (fd) => {
  const { field, fieldWrapper } = createInput(fd);
  field.type = 'checkbox';
  if (!field.value) field.value = 'on';
  field.classList.add('toggle');
  fieldWrapper.classList.add('selection-wrapper');

  const toggleSwitch = document.createElement('div');
  toggleSwitch.classList.add('switch');
  toggleSwitch.append(field);
  fieldWrapper.append(toggleSwitch);

  const slider = document.createElement('span');
  slider.classList.add('slider');
  toggleSwitch.append(slider);
  slider.addEventListener('click', () => {
    field.checked = !field.checked;
  });

  return { field, fieldWrapper };
};

const createCheckbox = (fd) => {
  const { field, fieldWrapper } = createInput(fd);
  if (!field.value) field.value = 'checked';
  fieldWrapper.classList.add('selection-wrapper');

  return { field, fieldWrapper };
};

const createRadio = (fd) => {
  const { field, fieldWrapper } = createInput(fd);
  if (!field.value) field.value = fd.Label || 'on';
  fieldWrapper.classList.add('selection-wrapper');

  return { field, fieldWrapper };
};

const FIELD_CREATOR_FUNCTIONS = {
  select: createSelect,
  heading: createHeading,
  plaintext: createPlaintext,
  'text-area': createTextArea,
  toggle: createToggle,
  submit: createSubmit,
  confirmation: createConfirmation,
  fieldset: createFieldset,
  checkbox: createCheckbox,
  radio: createRadio,
};

export default async function createField(fd, form) {
  fd.Id = fd.Id || generateFieldId(fd);
  const type = fd.Type.toLowerCase();
  const createFieldFunc = FIELD_CREATOR_FUNCTIONS[type] || createInput;
  const fieldElements = await createFieldFunc(fd, form);

  return fieldElements.fieldWrapper;
}
