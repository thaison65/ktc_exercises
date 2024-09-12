import CategoryType from '../../@types/category';

type CategoryElememtType = {
  (props: CategoryType): HTMLElement;
};

const CategoryElememt: CategoryElememtType = ({ id, name }) => {
  const CategoryEle = document.createElement('li');
  CategoryEle.classList.add('checkbox-wrapper-46');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = false;
  checkbox.id = `cbx-${id}`;
  checkbox.classList.add('inp-cbx');

  const label = document.createElement('label');
  label.htmlFor = `cbx-${id}`;
  label.classList.add('cbx');

  const span = document.createElement('span');
  span.innerHTML = ` <svg viewBox="0 0 12 10" height="10px" width="12px">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg>`;

  const spanTitle = document.createElement('span');
  spanTitle.textContent = name;

  label.appendChild(span);
  label.appendChild(spanTitle);

  CategoryEle.appendChild(checkbox);
  CategoryEle.appendChild(label);

  return CategoryEle;
};

export default CategoryElememt;
