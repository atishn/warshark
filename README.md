warshark
========

The game risk.


A HUGE reboot of Warfish.

After checkout/clone type 'npm install' this will install all dependencies.

1. install nodejs
2. install npm
3. run: npm install

You should also install supervisor. This will monitor your codebase for changes and restart the context.

4. npm install supervisor -g
   start the application with
5. sh start.sh
6. goto localhost:3000


Initial Version of API

GET /game/{id}

     {
	    boardStatus: {
	        id : (Unique to each game)
	        boardTypeId: [
	            {
	                id: <BoardType>,
	                name: ,
	                groups:[{
	                    id: <BoardGroup>,
	                    name: ,
	                    color: ,
	                    boardTypeId: ,
	                    nodeids: [list of ids],
	                    numberOfnodes: (Count of nodes),
	            },
	            {..}
	        ]
	        nodes: [
	            {
	                id: <NodeId>,
	                name: ,
	                groupId: ,
	                units: (Initial number of loaded units... Not sure , it may be removed),
	                boardTypeId: ,
	            },
	            {..}
	        ]
	    },
	    nodesState: [
	        {
	            id: <nodeStateId>,
	            nodeId: ,
	            ownerId: ,
	            currentUnits: ,
	        },
	        {..}
	    ],
	    users: [
	        {
	            id: <userid>,
	            referenceId: (Email address may be),
	            color: ,
	            userName: ,
	        },
	        {..}
	    ],
	    currentUser: ,
	    status: (New, In Progress, Finished),
	    createdAt: ,
	    updatedAt: ,
	}

POST /game/{id}/move

    RequestBody
    {
        fromNodeId:
        toNodeId:
        moverId:
        points:
    }

    ResponseBody
    { /* Returns only two nodeStateId */
        result: [
            {
                id:<nodeStateId>
                nodeId:
                ownerId:
                currentUnits:
            },
            {
                id:<nodeStateId>
                nodeId:
                ownerId:
                currentUnits:
            }
        ]
    }


Schema Objects.

BoardStatus{
     id : (Unique to each game)
     boardTypeId:[ Id of BoardType. Eg. America Map, World Map, Box View Map]
     nodesState:[Array of nodesState object]
     users:[Array of Users Object]
     currentUser:
     status:(New, In Progress, Finished)
     createdAt:
     updatedAt:
}

BoardType{
     id:
     name:
     groups:[Array of boardGroups(Each group of different color.... Continents in World Map, Regions in US Map) which belongs to boardType]
     nodes:[Array of nodes which belongs to boardType]
}

BoardGroup{
     id:
     name:
     color:
     boardTypeId:
     nodeids:[array of nodeIds belongs to this group]
     numberOfnodes:(Count of nodes)
}

Node{
     id:
     name:
     neighborIds:[Array of nodeids]
     groupId:
     units:(Initial number of loaded units... Not sure , it may be removed)
     boardTypeId:
}
NodeState{
     id:
     nodeId:
     ownerId:
     currentUnits:
}

User{
     id:
     referenceId:(Email address may be)
     color:
     userName:
}





