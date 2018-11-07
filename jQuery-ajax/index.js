$(function (){
    let $orders = $('#orders');
    let beverages = ['Coffee', 'Tea', 'Frappucino', 'Latte'];

    let $name = $('#name');
    let $drink = $('#drink');

    function addOrder(order) {
        let ramdomNumber = Math.floor((Math.random() * beverages.length-1) + 1);
        $orders.append('<li>'+
            '<strong>name: </strong>' + order.name +', '+ 
            '<strong>drink: </strong>' + beverages[ramdomNumber] + 
            '<button class="remove" data-id=' + order.id + '>X</button>'+
            '</li>'
        )
    }

    $.ajax({
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
        success: function(data) {
            let orders = data.slice(data.length / 2); //cut the user array in half
            $.each(orders, function(i, order) {                
                addOrder(order);
            });
        },
        error: function() {
            alert('error loading orders');
        }
    });

    //post example
    $('#add-order').on('click', function() {
        let order = {
            name: $name.val(),
            drink: $drink.val()
        };
        
        $.ajax({
            type: 'POST',
            url: 'https://jsonplaceholder.typicode.com/users',
            data: order,
            success: function(newOrder) { //if successfull - add new li to the list
                addOrder(order);
            },
            error: function() {
                alert('error saving order');
            }
        })
    });

    $orders.delegate('.remove', 'click', function() { //will listen to any click event on orders(parent)
        
        let $li = $(this).closest('li'); 
        
        $.ajax({
            type: 'DELETE',
            url: 'https://jsonplaceholder.typicode.com/users/' + $(this).attr('data-id'),
            success: function() {
                $li.fadeOut(50, function() {
                    $(this).remove();
                });
            }
        });
         
    });
});