class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
                productName: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                },
            } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    // Filter for categories
    filter(){
        const queryCopy = {...this.queryStr} 
        
        // Filter by categories
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);


        // Filter for price 
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`)   
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // Skipping per page queries
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;