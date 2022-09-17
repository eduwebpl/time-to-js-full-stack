export function ProductListItem({ product }) {
  const { price, product: details } = product || {};

  return (
    <li className="panel-block is-flex is-justify-content-space-between">
      {details?.name}
      <code className="ml-auto mr-2">{price}</code> PLN
    </li>
  );
}
