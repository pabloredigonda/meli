'use strict'

import * as dotenv from 'dotenv';
dotenv.config({path: '../../src/server/.env'});

import { expect } from 'chai'
import 'reflect-metadata'
import { container } from "../../src/server/inversify.config"
import { TYPES } from "../../src/server/types"
import { DnaServiceInterface } from "../../src/server/interfaces"

const dnaService = container.get<DnaServiceInterface>(TYPES.DnaServiceInterface)

describe('DnaService', function() {
  it('mutant1', function() {
    let result = dnaService.isMutant(["ACCA","CAAC","CAAC","ACCA"]);
    expect(result).equal(true);
  });

  it('mutant2', function() {
    let result = dnaService.isMutant(["GTCA","GTCA","GTCA","AAAA"]);
    expect(result).equal(true);
  });

  it('mutant3', function() {
    let result = dnaService.isMutant(["AAAA","ATCT","AGTC","ACGA"]);
    expect(result).equal(true);
  });

  it('mutant4', function() {
    let result = dnaService.isMutant(["AAAAAA","TTGGG","CCCTT","AAGGA", "TTCCT"]);
    expect(result).equal(true);
  });

  it('mutant5', function() {
    let result = dnaService.isMutant(["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]);
    expect(result).equal(true);
  });

  it('human1', function() {
    let result = dnaService.isMutant(["ATTC","TACC","GGAT","TCGA"]);
    expect(result).equal(false);
  });

  it('human2', function() {
    let result = dnaService.isMutant(["ATGC","ATGC","CAAT","TCCA"]);
    expect(result).equal(false);
  });

  it('human3', function() {
    let result = dnaService.isMutant(["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]);
    expect(result).equal(false);
  });
});

