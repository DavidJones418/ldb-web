export default {
    "scalars": [
        2,
        3,
        4,
        5,
        6,
        8,
        13,
        14,
        15,
        16,
        17
    ],
    "types": {
        "Query": {
            "station": [
                1,
                {
                    "crs": [
                        4,
                        "CRS!"
                    ],
                    "numRows": [
                        15
                    ],
                    "filterCrs": [
                        4
                    ],
                    "filterType": [
                        5
                    ],
                    "timeOffset": [
                        16
                    ],
                    "timeWindow": [
                        17
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "GetStationBoardResult": {
            "generatedAt": [
                2
            ],
            "locationName": [
                3
            ],
            "crs": [
                4
            ],
            "filterLocationName": [
                3
            ],
            "filtercrs": [
                3
            ],
            "filterType": [
                5
            ],
            "nrccMessages": [
                3
            ],
            "platformAvailable": [
                6
            ],
            "areServicesAvailable": [
                6
            ],
            "trainServices": [
                7
            ],
            "busServices": [
                7
            ],
            "ferryServices": [
                7
            ],
            "__typename": [
                3
            ]
        },
        "DateTime": {},
        "String": {},
        "CRS": {},
        "FilterType": {},
        "Boolean": {},
        "ServiceItem": {
            "sta": [
                3
            ],
            "eta": [
                3
            ],
            "std": [
                3
            ],
            "etd": [
                3
            ],
            "platform": [
                3
            ],
            "operator": [
                3
            ],
            "operatorCode": [
                3
            ],
            "isCircularRoute": [
                6
            ],
            "isCancelled": [
                6
            ],
            "filterLocationCancelled": [
                6
            ],
            "serviceType": [
                3
            ],
            "length": [
                8
            ],
            "detachFront": [
                6
            ],
            "isReverseFormation": [
                6
            ],
            "cancelReason": [
                3
            ],
            "delayReason": [
                3
            ],
            "adhocAlerts": [
                3
            ],
            "serviceID": [
                3
            ],
            "rsid": [
                3
            ],
            "origin": [
                9
            ],
            "destination": [
                9
            ],
            "currentOrigins": [
                9
            ],
            "currentDestinations": [
                9
            ],
            "formation": [
                10
            ],
            "__typename": [
                3
            ]
        },
        "Int": {},
        "ServiceLocation": {
            "locationName": [
                3
            ],
            "crs": [
                4
            ],
            "via": [
                3
            ],
            "futureChangeTo": [
                3
            ],
            "assocIsCancelled": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "FormationData": {
            "avgLoading": [
                8
            ],
            "coaches": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "CoachData": {
            "coachClass": [
                3
            ],
            "loading": [
                8
            ],
            "number": [
                3
            ],
            "toilet": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "ToiletAvailabilityType": {
            "status": [
                13
            ],
            "value": [
                14
            ],
            "__typename": [
                3
            ]
        },
        "ToiletStatus": {},
        "ToiletType": {},
        "PositiveInt": {},
        "TimeOffset": {},
        "TimeWindow": {}
    }
}