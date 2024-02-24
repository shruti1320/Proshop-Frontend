
const MerchantPage = () => {
    
    const data = []
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Sr. no.</th>
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Details</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data != undefined ? data.map((item, index) => (
                        <tr>

                            <th>Sr. no.</th>
                            <th><img src={''} alt='product' /></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Details</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    )) : <div>Loading....</div>}
                </tbody>
            </table>
        </div>
    )
}

export default MerchantPage