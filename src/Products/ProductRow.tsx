export interface IProductRow {
    product: {
        id: number,
        name: string,
        price: number,
        type: string,
        active: boolean
    }
}

function ProductRow(props: IProductRow) {
    const {product} = props
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.type}</td>
            <td>{product.active ? '√' : 'X'}</td>
        </tr>
    )
}

export default ProductRow
