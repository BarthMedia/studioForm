function hello( ...args )
{
    // Values
    let string = ''

    // Loop
    args.forEach((arg, index) => {
        string += ( index == 0 ? ' ' : ( index == args.length -1 ? ' & ' : ', ') ) + arg
    })

    // If no args
    if ( string == '' ) string = ', world'

    // End value
    let val = "Hello" + string + "!"

    // Return
    return val
}

module.exports = hello