import { Colors } from "@/src/constants/Colors";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

interface RevenueInputProps {
  label: string;
  value: number | null;
  setValue: (label: string, value: number | null) => void;
  editMode?: boolean;
  toggleEditing: () => void;
}
const RevenueInput = ({
  label,
  value,
  setValue,
  toggleEditing,
}: RevenueInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const submitValue = () => {
    if (inputValue !== null && inputValue !== undefined) {
      setValue(label, inputValue);
      toggleEditing();
    } else {
      // Handle case where input is invalid
      console.warn("Invalid input value");
    }
  };

  return (
    <TouchableOpacity style={{ flexDirection: "row" }}>
      <TextInput
        style={[styles.input, { borderColor: Colors.light.border.primary }]}
        placeholder={`${label} 입력`}
        placeholderTextColor={Colors.light.text.secondary}
        keyboardType="numeric"
        autoFocus
        onSubmitEditing={submitValue}
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        onBlur={submitValue}
        clearButtonMode="while-editing"
        textAlign="right"
        textAlignVertical="center"
        selectionColor={Colors.light.primary[300]}
        value={inputValue?.toString()}
        defaultValue={value?.toString() || ""}
        onChangeText={(text) => setInputValue(Number(text))}
      />
      <TouchableOpacity onPress={submitValue} style={{ alignItems: "center" }}>
        <Text
          style={{
            ...styles.label,
            backgroundColor: Colors.light.primary[300],
            padding: 4,
            paddingVertical: 6,
            color: Colors.light.text.inverse,
          }}
          onPress={() => {
            setValue(label, inputValue);
            submitValue();
          }}
        >
          완료
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = {
  input: {
    borderBottomWidth: 1,
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 16,
    minWidth: 100,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
};

export default RevenueInput;
