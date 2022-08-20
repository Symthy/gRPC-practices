package main

import (
	"fmt"
	"io/ioutil"
	"log"

	"github.com/Symthy/golang-practices/go-grpc/basic/protobuf"
	"github.com/golang/protobuf/jsonpb"
	"google.golang.org/protobuf/proto"
)

func main() {
	employee := &protobuf.Employee{
		Id:                1,
		Name:              "SYM",
		Email:             "test@example.com",
		Occupation:        protobuf.Occupation_ENGINEER,
		ThirdPartyAccount: []string{"https://github.com/Symthy", "https://twitter.com/SYM_souten"},
		Products:          map[string]*protobuf.Company_Product{"ProductA": &protobuf.Company_Product{}},
		Profile: &protobuf.Employee_Text{
			Text: "SYM",
		},
		JoinedDate: &protobuf.Date{
			Year:  2015,
			Month: 4,
			Day:   1,
		},
	}

	// binary file write and read
	// serialize(employee)
	// deserialize()

	// json file write
	printJson(employee)
}

func serialize(employee *protobuf.Employee) {
	binary, err := proto.Marshal(employee)
	if err != nil {
		log.Fatalln("serialize failure:", err)
	}
	if err := ioutil.WriteFile("employee.bin", binary, 0666); err != nil {
		log.Fatalln("write binary data failure:", err)
	}
}

func deserialize() {
	data, err := ioutil.ReadFile("employee.bin")
	if err != nil {
		log.Fatalln("read failure:", err)
	}
	employee := &protobuf.Employee{}
	err = proto.Unmarshal(data, employee)
	if err != nil {
		log.Fatalln("deserialize failure:", err)
	}
	fmt.Println(employee)
}

func printJson(employee *protobuf.Employee) {
	m := jsonpb.Marshaler{}
	out, err := m.MarshalToString(employee)
	if err != nil {
		log.Fatalln("failed marshal to json:", err)
	}
	fmt.Println("marshal to json:")
	fmt.Println(out)

	readData := &protobuf.Employee{}
	if err := jsonpb.UnmarshalString(out, readData); err != nil {
		log.Fatalln("failed unmarshl from json", err)
	}
	fmt.Println("unmarshal from json:")
	fmt.Println(readData)
}
