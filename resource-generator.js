const hbs = require("handlebars")
const _ = require("lodash")

module.exports = conf => {
    const resource = {}
    const props = _.get(["paths", "/sites", "post", "requestBody", "content", "application/json", "schema", "properties"], {})
    resource.properties = getSchemaForProps(props)
}

const getSchemaForProps = props => {
    const schema = {}

    for (key in props) {
        schema[key] = {
            key,
            schema: getSchema(props[key])
        } 
    }

    return schema
}

const getType = typeStr => {
    switch (typeStr) {
        case "string":
            return "schema.TypeString"
        case "bool":
            return "schema.TypeBool"
        case "array":
            return "schema.TypeList"
        case "integer":
            return "schema.TypeInt"
        case "object":
            return "schema.TypeMap"
    }
} 

const getElem = val => {
    if (val.type === "array") {
        return `&schema.Schema{Type: schema.TypeString}`
    } else if (val.type === "object") {
        return ``
    }
}

const getSchema = val => {
    const a = {
        Type: getType(val.type),
        Computed: val.readOnly === true,
        Required: val.required === true,
        Optional: val.required !== true,
        Description: val.description,
        Elem: getElem(val)
    }
}