<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]
### Disclaimer

This microservice was necessary for me to graduate in the Master's Degree in Engineering of Computer and Telematics. If interested, check [MSC Eduardo Almeida]() to know more!

### REC Platform - Meters Microservice

The Renewable Energy Community Platform consists in a microservices API to enable and enhance Peer-to-Peer energy Transactions between Prosumers and consumers of a community.

The meter microservice is where the real-time measurements sent by the meters are stored for later access.

Why building a REC Platform using microservices:
* The project was developed together with other devs
* Changes in one particular module forced to shutdown/reboot the whole API.
* This is part of a research program, therefore multiple experimental ideas, frameworks, and scripts were used. 


<p align="right">(<a href="#readme-top">Back to Top</a>)</p>



### Built With

To make the API work, these are the core features of the Gateway:

* [NestJS](https://nestjs.com/)
* [Docker Container](https://www.docker.com/)
* [gRPC](https://grpc.io/)
* [InfluxDb](https://www.influxdata.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

The Meters microservice requires Gateway to be operational as well as a InfluxDB database to store the data.

Other microservices links:
* [Market microservice](https://github.com/eapsa/REC-Platform-Market/)
* [Gateway microservice](https://github.com/AnBapDan/REC-Platform-Gateway/)
* [Transactions microservice](https://github.com/AnBapDan/REC-Platform-Transactions/)

### Prerequisites

To get it started:

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AnBapDan/REC-Platform-Meters.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter the Profobuf repo in `package.json` on the dependencies tab
   ```js
       "grpc-protos": "git+REPOSITORY",
   ```
4. Update the influxdb client in `src/meters/meters.service.ts`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deployment
The all microservices structure is supposed to be deployed using Docker Swarm. Below are the steps to achieve it correctly.

1. Create a network that hosts all the stack
    ```sh
    docker network create --driver=overlay --attachable RECNetwork
    ```


2. Run every Dockerfile to create its image
    ```sh
    docker build -t <img_name>:<version>
    ```

3. Deploy the whole Docker stack
    ```sh
    docker stack deploy -c docker-compose.yml RECNetwork
    ```

#### The commands below are auxiliary if you need to debug some microservice:
    docker ps -f "label=com.docker.swarm.service.name=RECNetwork_gateway" --format "{{.ID}}"
    docker stack services RECNetwork
    docker service logs <service_name>
    docker exec -it <HASH_name> command

## Contact

Eduardo Almeida - eapsa@ua.pt

Project Link: [https://github.com/eapsa/REC-Platform-Meters.git](https://github.com/eapsa/REC-Platform-Meters.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/eduardo-almeida-1a20b8257/