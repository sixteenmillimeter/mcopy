/*!
 *  @file Adafruit_Pixie.h
 */

#ifndef ADAFRUIT_PIXIE_H
#define ADAFRUIT_PIXIE_H

#include <Arduino.h>

/*!
 *  @brief  Class that stores state and functions for interacting with Adafruit
 *          Pixie.
 */
class Adafruit_Pixie {
public:
  Adafruit_Pixie(uint16_t n, Stream *stream);
  ~Adafruit_Pixie();

  void show();
  void setPixelColor(uint16_t n, uint8_t r, uint8_t g, uint8_t b);
  void setPixelColor(uint16_t n, uint32_t c);
  void setBrightness(uint8_t b);
  void clear();
  uint8_t getBrightness() const;
  uint8_t *getPixels() const;
  uint16_t numPixels() const;
  static uint32_t Color(uint8_t r, uint8_t g, uint8_t b);
  uint32_t getPixelColor(uint16_t n) const;

  /*!
   *  @brief  Returns true if enough time has passed to refresh the LEDs
   *  @return True if enough time has passed to refresh the LEDs
   */
  inline bool canShow() { return (micros() - endTime) > 1000L; }

private:
  const uint16_t numLEDs;      // Number of RGB LEDs in chain
  uint8_t brightness, *pixels; // Holds LED color values (3 bytes each)
  uint32_t endTime;            // Latch timing reference
  Stream *stream;              // Hardware or software serial port
};

#endif // ADAFRUIT_PIXIE_H
