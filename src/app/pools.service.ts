import { Injectable } from '@angular/core';

export interface PoolUser {
  firstName: string;
  lastName: string;
  position: number;
}

export interface Pool {
  name: string;
  users: PoolUser[];
}

@Injectable({
  providedIn: 'root'
})
export class PoolsService {
  pools: Pool[] = [
    {
      name: "Work Pool",
      users: [
        {
          firstName: "Arthur",
          lastName: "Dent",
          position: 1
        },
        {
          firstName: "Ford",
          lastName: "Prefect",
          position: 2
        },
        {
          firstName: "Zaphod",
          lastName: "Beeblebrox",
          position: 3
        }
      ]
    },
    {
      name: "Friends Pool",
      users: [
        {
          firstName: "Leon",
          lastName: "Timmerman",
          position: 1
        },
        {
          firstName: "Yannick",
          lastName: "de Graaf",
          position: 2
        },
        {
          firstName: "Yessin",
          lastName: "El Khaldi",
          position: 3
        },
        {
          firstName: "Gabriel",
          lastName: "Takyie",
          position: 4
        },
        {
          firstName: "Steven",
          lastName: "Oud",
          position: 5
        }
      ]
    }
  ];

  constructor() { }

  getUserPools() {
    return this.pools;
  }
}
