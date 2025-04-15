import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Issue from "./Issue";
import Reciept from "./Reciept";
import Section from "./Section";
import RadioGroup from "./RadioGroup";
import Cancellation from "./Cancellation";

const RenderFormContent = ({
  formData,
  handleChange,
  handleArrayChange,
  handleSubmit,
  styles,
}) => {
  // if (isFullySubmitted) {
  //   return (
  //     <View style={{ alignItems: "center", padding: 20 }}>
  //       <Text
  //         style={{
  //           fontSize: 18,
  //           fontWeight: "bold",
  //           color: "#003366",
  //           marginBottom: 10,
  //         }}
  //       >
  //         Thank you! 🎉
  //       </Text>
  //       <Text style={{ fontSize: 14, color: "#333", textAlign: "center" }}>
  //         The permit form and cancellation were submitted successfully.
  //       </Text>

  //       <TouchableOpacity
  //         style={[styles.submitButton, { marginTop: 20 }]}
  //         onPress={() => {
  //           resetForm();
  //           setIsFullySubmitted(false);
  //         }}
  //       >
  //         <Text style={styles.submitButtonText}>Fill Another Form</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  return (
    <>
      <Issue
        formData={formData}
        handleChange={handleChange}
        handleArrayChange={handleArrayChange}
      />
      <Reciept formData={formData} handleChange={handleChange} />

      <Section title="3 Urgency">
        <View style={styles.urgencyOptions}>
          <RadioGroup
            options={[
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ]}
            selected={formData.urgency}
            onSelect={(value) => handleChange("urgency", value)}
            horizontal={true}
          />
        </View>
      </Section>

      <View style={styles.formFooter}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleSubmit();
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Permit Form</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // return (
  //   <>
  //     <Text style={styles.sectionText}>
  //       Permit Number: {formData.permit_number}
  //     </Text>
  //     <Cancellation formData={formData} handleChange={handleChange} />

  //     <View style={styles.formFooter}>
  //       <TouchableOpacity
  //         style={styles.submitButton}
  //         // onPress={handleSubmit2}
  //         onPress={() => {
  //           handleSubmit2();
  //         }}
  //         activeOpacity={0.8}
  //       >
  //         <Text style={styles.submitButtonText}>Cancel Permit</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </>
  // );
};

export default RenderFormContent;
