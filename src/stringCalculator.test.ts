import { describe, it, expect } from 'vitest';
import { add } from './stringCalculator';

describe('String Calculator', () => {
  describe('add', () => {
    it('should return 0 for an empty string', () => {
      expect(add('')).toBe(0);
    });

    it('should return the number itself for a single number', () => {
      expect(add('1')).toBe(1);
      expect(add('5')).toBe(5);
    });

    it('should return the sum of two comma-separated numbers', () => {
      expect(add('1,2')).toBe(3);
      expect(add('10,20')).toBe(30);
    });

    it('should handle multiple numbers', () => {
      expect(add('1,2,3,4,5')).toBe(15);
    });

    it('should handle newlines as delimiters', () => {
      expect(add('1\n2,3')).toBe(6);
    });

    it('should support custom delimiters', () => {
      expect(add('//;\n1;2')).toBe(3);
      expect(add('//|\n1|2|3')).toBe(6);
    });

    it('should throw an error for negative numbers', () => {
      expect(() => add('1,-2,3')).toThrow('Negative numbers not allowed: -2');
      expect(() => add('1,-2,-3')).toThrow('Negative numbers not allowed: -2, -3');
    });

    it('should ignore numbers greater than 1000', () => {
      expect(add('2,1001')).toBe(2);
      expect(add('1000,1001,2')).toBe(1002);
    });

    it('should handle delimiters of any length', () => {
      expect(add('//[***]\n1***2***3')).toBe(6);
    });

    it('should handle multiple delimiters', () => {
      expect(add('//[*][%]\n1*2%3')).toBe(6);
    });

    it('should handle multiple delimiters of any length', () => {
      expect(add('//[**][%%]\n1**2%%3')).toBe(6);
    });
  });
});
