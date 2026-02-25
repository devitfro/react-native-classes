import { Text, TouchableOpacity, View, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import RatesStyle from "./css/RatesStyle";
import INbuRate from "./orm/INbuRate";
import NbuApi from "./api/NbuApi";
import DatePicker from "react-native-date-picker";

export default function Rates() {
  const [rates, setRates] = useState<Array<INbuRate>>([]);
  const [shownRates, setShownRates] = useState<Array<INbuRate>>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isOpen, setOpen] = useState<boolean>(false);

  // Загрузка курсов по выбранной дате
  useEffect(() => {
    setLoading(true);

    NbuApi.getRatesForDate(date)
      .then(data => {
        setRates(data);
      })
      .finally(() => setLoading(false));
  }, [date]);

  // Фильтрация по input
  useEffect(() => {
    if (filter.length === 0) {
      setShownRates([...rates]);
    } else {
      setShownRates([...rates.filter(r => 
        r.cc.includes(filter.toUpperCase()) || 
        r.txt.toLowerCase().includes(filter.toLowerCase())
      )]);
    }
  }, [rates, filter]);

  const showDatePicker = () => setOpen(true);

  return (
    <View style={RatesStyle.container}>
      <View style={RatesStyle.titleBar}>
        <View style={RatesStyle.titleSearch}>
          <Image 
            style={RatesStyle.titleSearchImg} 
            source={require('../../features/assets/img/search.png')} />
          <TextInput 
            value={filter} 
            style={RatesStyle.titleSearchInput} 
            onChangeText={setFilter} 
            placeholder=""
          />
        </View>

        <View style={RatesStyle.pageTitle}>
          <Text style={RatesStyle.pageTitleText}>Курси валют НБУ</Text>
        </View>

        <View style={RatesStyle.titleDate}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={RatesStyle.titleDateText}>{date.toDotted()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading 
        ? <Text>Завантажується ...</Text>
        : <ScrollView>
            {shownRates.map(r => (
              <View key={r.r030} style={RatesStyle.rateItem}>
                <View>
                  <Text style={RatesStyle.rateText}>{`1 ${r.cc}`}</Text>
                  <Text style={RatesStyle.rateTextDescr}>{r.txt}</Text>
                </View>
                <View>
                  <Text style={RatesStyle.rateText}>{`${r.rate} грн`}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
      }

      <DatePicker
        modal
        open={isOpen}
        mode="date"
        date={date}
        onConfirm={(date) => setDate(date)}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}