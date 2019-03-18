sol_base03 = '#002b36'
sol_base02 = '#073642'
sol_base01 = '#586e75'
sol_base00 = '#657b83'
sol_base0 = '#839496'
sol_base1 = '#93a1a1'
sol_base2 = '#eee8d5'
sol_base3 = '#fdf6e3'
sol_yellow = '#b58900'
sol_orange = '#cb4b16'
sol_red = '#dc322f'
sol_magenta = '#d33682'
sol_violet = '#6c71c4'
sol_blue = '#268bd2'
sol_cyan = '#2aa198'
sol_green = '#859900'


setup = function () {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Events = Matter.Events
        Bodies = Matter.Bodies;

    //Fetch our canvas
    var canvas = document.getElementById('world');
    var width = $(window).width(),
        height = $(window).height()

    //Setup Matter JS
    var engine = Engine.create();
    var world = engine.world;
    var render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: width,
            height: height,
            background: sol_base03,
            wireframes: false,
            showAngleIndicator: false
        }
    });

    var floorHeight = 10
    floorWidth = width
    floorX = width / 2
    floorY = height + (floorHeight / 2)
    floor = Matter.Bodies.rectangle(floorX, floorY, floorWidth, floorHeight, {
        isStatic: true, //An immovable object
        render: {
            visible: false,
            fillStyle: 'red'
        }
    });


    var ceilingHeight = 10
    ceilingWidth = width
    ceilingX = width / 2
    ceilingY = 0 - (ceilingHeight / 2)
    ceiling = Matter.Bodies.rectangle(ceilingX, ceilingY, ceilingWidth, ceilingHeight, {
        isStatic: true,
        render: {
            visible: false,
            fillStyle: 'red'
        }
    })


    var wallRightHeight = height
    wallRightWidth = 10
    wallRightX = width
    wallRightY = wallRightHeight / 2
    wallRight = Matter.Bodies.rectangle(wallRightX, wallRightY, wallRightWidth, wallRightHeight, {
        isStatic: true,
        render: {
            visible: false,
            fillStyle: 'red'
        }
    })
    World.add(world, [floor, ceiling, wallRight])

    var wallLeftHeight = height
    wallLeftWidth = 10
    wallLeftX = 0
    wallLeftY = wallLeftHeight / 2
    wallLeft = Matter.Bodies.rectangle(wallLeftX, wallLeftY, wallLeftWidth, wallLeftHeight, {
        isStatic: true,
        render: {
            visible: false,
            fillStyle: 'red'
        }
    })
    World.add(world, [floor, ceiling, wallRight, wallLeft])

    ball_colors = [
        sol_base01,
        sol_base00,
        sol_base0,
        sol_base1

    ]
    // add bodies
    var stack = Composites.stack(20, 20, 40, 40, 0, 0, function (x, y) {
        return Bodies.circle(x, y, Common.random(30, 50), {
            render: {
                fillStyle: Common.choose(ball_colors),
                strokeStyle: 'translucent',
                lineWidth: 0
            }
        });
    });

    World.add(world, stack);


    //Make interactive
    var mouseConstraint = MouseConstraint.create(engine, { //Create Constraint
        element: canvas,
        constraint: {
            render: {
                visible: false
            },
            stiffness: 0.8
        }
    });
    World.add(world, mouseConstraint);

    //Start the engine
    Engine.run(engine);
    Render.run(render);

    var linkedin = document.getElementById('linkedin')
}

window.addEventListener('load', setup)
window.addEventListener('resize', setup)